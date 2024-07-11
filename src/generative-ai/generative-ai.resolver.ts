import { Resolver, Query, Args } from '@nestjs/graphql';
import { GenerativeAiService } from './generative-ai.service';

@Resolver()
export class GenerativeAiResolver {
  constructor(private readonly generativeAiService: GenerativeAiService) {}

  @Query(() => String)
  async getGeminiResponse(
    @Args('promptInput', { nullable: false })
    promptInput: string,
  ): Promise<any> {
    return this.generativeAiService.getGeminiResponse(promptInput);
  }
}
