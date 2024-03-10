import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jws-auth.guard';
import { MovieDto } from './dto/movie.dto';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: MovieDto })
  @ApiBody({ type: CreateMovieDto })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @ApiOkResponse({ type: MovieDto, isArray: true })
  @Get()
  findAll(): Promise<MovieDto[]> {
    return this.movieService.findAll();
  }

  @ApiCreatedResponse({ type: MovieDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: MovieDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<MovieDto> {
    return this.movieService.update(+id, updateMovieDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: MovieDto })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<MovieDto> {
    return this.movieService.remove(+id);
  }
}
