import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { BeautifulPlacesToRunAppComponent } from '../app/beautiful-places-to-run.component';

beforeEachProviders(() => [BeautifulPlacesToRunAppComponent]);

describe('App: BeautifulPlacesToRun', () => {
  it('should create the app',
      inject([BeautifulPlacesToRunAppComponent], (app: BeautifulPlacesToRunAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'beautiful-places-to-run works!\'',
      inject([BeautifulPlacesToRunAppComponent], (app: BeautifulPlacesToRunAppComponent) => {
    expect(app.title).toEqual('beautiful-places-to-run works!');
  }));
});
