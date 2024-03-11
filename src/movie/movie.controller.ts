import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  UseGuards,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
// import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jws-auth.guard';
import { MovieDto } from './dto/movie.dto';
import { ApiMovieDto } from 'src/api/dto/apimovie.dto';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MovieDto })
  @ApiBody({ type: CreateMovieDto })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.createOrFind(createMovieDto);
  }

  @ApiOkResponse({ type: MovieDto, isArray: true })
  @Get()
  findAll(): Promise<MovieDto[]> {
    return this.movieService.findAll();
  }

  @ApiOkResponse({ type: String })
  @Get('api')
  getApi(): string {
    return this.movieService.apiTest();
  }

  @ApiOkResponse({ type: ApiMovieDto })
  @ApiBadRequestResponse()
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'imdb_id', required: false })
  @Get('api/movie')
  getMovieByTitleOrId(
    @Query('title') title?: string,
    @Query('imdb_id') imdb_id?: string,
  ): Promise<ApiMovieDto> {
    if (title) {
      return this.movieService.getMovieByTitle(title);
    } else if (imdb_id) {
      return this.movieService.getMovieByImdb(imdb_id);
    } else {
      throw new BadRequestException('Either title or imdb_id must be provided');
    }
  }

  @ApiOkResponse({ type: ApiMovieDto })
  @ApiBadRequestResponse()
  @ApiQuery({ name: 'title', required: true })
  @ApiQuery({ name: 'page', required: true })
  @Get('api/movies')
  getMoviesByTitle(
    @Query('title') title: string,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<ApiMovieDto> {
    if (title) {
      return this.movieService.getMoviesByTitle(title, page);
    } else {
      throw new BadRequestException('Either title and page must be provided');
    }
  }

  @ApiCreatedResponse({ type: MovieDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiCreatedResponse({ type: MovieDto })
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMovieDto: UpdateMovieDto,
  // ): Promise<MovieDto> {
  //   return this.movieService.update(+id, updateMovieDto);
  // }

  // @UseGuards(JwtAuthGuard)
  // @ApiCreatedResponse({ type: MovieDto })
  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<MovieDto> {
  //   return this.movieService.remove(+id);
  // }
}
