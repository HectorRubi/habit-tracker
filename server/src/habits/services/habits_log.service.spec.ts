import { Test, TestingModule } from '@nestjs/testing';
import { HabitsLogService } from './habits_log.service';

describe('HabitsLogService', () => {
  let service: HabitsLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitsLogService],
    }).compile();

    service = module.get<HabitsLogService>(HabitsLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
