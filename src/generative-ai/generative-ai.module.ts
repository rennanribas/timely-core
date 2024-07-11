import { Module } from '@nestjs/common';
import { GenerativeAiService } from './generative-ai.service';
import { GenerativeAiResolver } from './generative-ai.resolver';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GenerativeAiService, GenerativeAiResolver],
})
export class GenerativeAiModule {}
