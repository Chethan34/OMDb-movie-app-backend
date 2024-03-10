import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ApiMovieDto } from './dto/apimovie.dto';

@Injectable()
export class ApiService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'hello from api';
  }

  async getMoviesByTitle(
    title: string,
    page: number = 1,
  ): Promise<ApiMovieDto> {
    const response = await axios.get(
      `${this.configService.get('API_URL')}?apikey=${this.configService.get('API_KEY')}&s=${title}&page=${page}`,
    );

    return response.data;
  }

  async getMovieByTitle(title: string): Promise<ApiMovieDto> {
    const response = await axios.get(
      `${this.configService.get('API_URL')}?apikey=${this.configService.get('API_KEY')}&t=${title}`,
    );

    return response.data;
  }

  async getMovieByImdb(imdb_id: string): Promise<ApiMovieDto> {
    const response = await axios.get(
      `${this.configService.get('API_URL')}?apikey=${this.configService.get('API_KEY')}&i=${imdb_id}`,
    );

    return response.data;
  }
}
