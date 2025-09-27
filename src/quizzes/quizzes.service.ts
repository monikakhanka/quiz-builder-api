import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    try {
      const quiz = this.quizRepository.create({
        ...createQuizDto,
        updatedAt: new Date(),
      });
      return await this.quizRepository.save(quiz);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create quiz',
        error.message,
      );
    }
  }

  async findAll(): Promise<Quiz[]> {
    try {
      return await this.quizRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch quizzes',
        error.message,
      );
    }
  }

  async findOne(id: string): Promise<Quiz> {
    try {
      const quiz = await this.quizRepository.findOneBy({ id });
      if (!quiz) {
        throw new NotFoundException(`Quiz with id ${id} not found`);
      }
      return quiz;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to fetch quiz',
        error.message,
      );
    }
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    try {
      const quiz = await this.quizRepository.findOneBy({ id });
      if (!quiz) {
        throw new NotFoundException(`Quiz with id ${id} not found`);
      }

      const updateQuiz = this.quizRepository.merge(quiz, {
        ...updateQuizDto,
        updatedAt: new Date(),
      });

      return this.quizRepository.save(updateQuiz);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to update quiz',
        error.message,
      );
    }
  }

  async remove(id: string): Promise<Quiz> {
    try {
      const quiz = await this.quizRepository.findOneBy({ id });
      if (!quiz) {
        throw new NotFoundException(`Quiz with id ${id} not found`);
      }
      await this.quizRepository.remove(quiz);

      return quiz;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to remove quiz',
        error.message,
      );
    }
  }
}
