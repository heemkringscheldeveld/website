import { ScullyConfig } from '@scullyio/scully';
import { City } from 'src/app/models/city';
import * as Cities from '../heemkringscheldeveld/src/assets/data.json';

const cities: City[] = Cities;

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "heemkringscheldeveld",
  outDir: './dist/static',
  routes: {},
  extraRoutes: cities.map(city => `/gemeente/${city.key}`)
};