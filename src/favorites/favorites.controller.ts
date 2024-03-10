import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jws-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Request as RequestType } from 'express';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: UpdateFavoriteDto })
  @ApiBody({ type: CreateFavoriteDto })
  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiOkResponse()
  // @Get()
  // findAll() {
  //   return this.favoritesService.findAll();
  // }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @Get()
  findMyFavorites(@Req() request: RequestType) {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = this.jwtService.decode(jwt, { json: true });

    return this.favoritesService.findMyFavoriteMovies(json.sub);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse()
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }
}
