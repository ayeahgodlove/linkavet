// src/presentation/dtos/banner-request.dto.ts

import {  IsNotEmpty, IsString, Length } from "class-validator";
import { IBanner, emptyBanner } from "../../domain/models/banner";
import { nanoid } from "nanoid";
export class BannerRequestDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 255)
  title: string;

  @IsNotEmpty()
  @IsString()
  subTitle: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  constructor(data: IBanner) {
    this.title = data.title;
    this.subTitle = data.subTitle;
    this.image = data.image;
  }

  toData(): IBanner {
    return {
      ...emptyBanner,
      id: nanoid(10),
      title: this.title,
      subTitle: this.subTitle,
      image: this.image
    };
  }

  toUpdateData(data: IBanner): IBanner {
    return {
      id: data.id,
      title: data.title,
      subTitle: data.subTitle,
      image: data.image,
      userId: data.userId,
    }
  }
}
