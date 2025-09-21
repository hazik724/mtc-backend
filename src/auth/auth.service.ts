// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateAdmin(email: string, pass: string) {
    const admin = await this.prisma.admin.findUnique({ where: { email } });
    if (!admin) return null;
    const isMatch = await bcrypt.compare(pass, admin.password);
    if (!isMatch) return null;
    return admin;
  }

  async login(admin: any) {
    const payload = { sub: admin.id, email: admin.email, role: admin.role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_EXPIRES_IN || '7d',
    });

    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    await this.prisma.admin.update({
      where: { id: admin.id },
      data: { refreshToken: hashedRefresh },
    });

    return { accessToken, refreshToken };
  }

  async logout(adminId: number) {
    await this.prisma.admin.update({
      where: { id: adminId },
      data: { refreshToken: null },
    });
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload: any = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET || 'dev_secret',
      });

      const admin = await this.prisma.admin.findUnique({ where: { id: payload.sub } });
      if (!admin || !admin.refreshToken) throw new UnauthorizedException();

      const match = await bcrypt.compare(refreshToken, admin.refreshToken);
      if (!match) throw new UnauthorizedException();

      const newAccess = this.jwtService.sign(
        { sub: admin.id, email: admin.email, role: admin.role },
        { expiresIn: process.env.JWT_EXPIRES_IN || '15m' },
      );

      const newRefresh = this.jwtService.sign(
        { sub: admin.id, email: admin.email, role: admin.role },
        { expiresIn: process.env.REFRESH_EXPIRES_IN || '7d' },
      );

      const hashed = await bcrypt.hash(newRefresh, 10);
      await this.prisma.admin.update({
        where: { id: admin.id },
        data: { refreshToken: hashed },
      });

      return { accessToken: newAccess, refreshToken: newRefresh };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
