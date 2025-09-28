import { Controller, Get, Post, Delete, Body, Param, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { SchoolGalleryService } from "./school-gallery.service";
import cloudinary from "../cloudinary";

@Controller("school/gallery")
export class SchoolGalleryController {
  constructor(private readonly service: SchoolGalleryService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string }
  ) {
    if (!file) throw new Error("File is required");

    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "school_gallery", resource_type: "auto" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(file.buffer);
    });

    return this.service.create({
      title: body.title,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  }

  // ✅ Add GET route to fetch all gallery items
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  // ✅ (Optional) Add GET one by id
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.service.findOne(Number(id));
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.service.remove(Number(id));
  }
}
