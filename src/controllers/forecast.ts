import { Controller, Get } from '@overnightjs/core';
import { Beach } from '@src/models/beaches';
import { Forecast } from '@src/services/forecast';
import { Request, Response } from 'express';

const forecast = new Forecast();
@Controller('forecast')
export class ForecastController {
  @Get('')
  public async getForecastForLoggedUser(
    _: Request,
    res: Response
  ): Promise<void> {
    try {
      const beaches = await Beach.find({});
      const forecastData = await forecast.processForecastForBeaches(beaches);

      res.status(200).send(forecastData);
    } catch (err) {
      // const error = err as Error
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
}
