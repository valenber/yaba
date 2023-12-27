import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('throws error', () => {
    test('when given credentials of unknown user', () => {
      const unknownUser = {
        email: 'a',
        password: 'b',
      };

      expect(() => appController.loginUser(unknownUser)).toThrow(
        'Invalid credentials',
      );
    });

    test('when given credentials of known user with wrong password', () => {
      const knownUser = {
        email: 'me@pm.com',
        password: 'b',
      };

      expect(() => appController.loginUser(knownUser)).toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('returns user', () => {
    test('when given credentials of known user with correct password', () => {
      const knownUser = {
        email: 'me@pm.com',
        password: 'mememe',
      };

      const response = appController.loginUser(knownUser);

      expect(response).toBe(
        JSON.stringify({
          email: knownUser.email,
          status: 'JWT is coming soon',
        }),
      );
    });
  });
});
