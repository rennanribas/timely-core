import { Test, TestingModule } from '@nestjs/testing';
import { GenerativeAiResolver } from './generative-ai.resolver';
import { GenerativeAiService } from './generative-ai.service';

describe('GenerativeAiResolver', () => {
  let resolver: GenerativeAiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerativeAiResolver, GenerativeAiService],
    }).compile();

    resolver = module.get<GenerativeAiResolver>(GenerativeAiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
