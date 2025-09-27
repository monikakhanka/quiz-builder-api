import { Injectable, NotFoundException } from '@nestjs/common';
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
    const quiz = this.quizRepository.create({
      ...createQuizDto,
      updatedAt: new Date(),
    });
    return await this.quizRepository.save(quiz);
  }

  async findAll(): Promise<Quiz[]> {
    return await this.quizRepository.find();
  }

  async findOne(id: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOneBy({ id });
    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }
    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.quizRepository.findOneBy({ id });
    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }

    const updateQuiz = this.quizRepository.merge(quiz, {
      ...updateQuizDto,
      updatedAt: new Date(),
    });

    return this.quizRepository.save(updateQuiz);
  }

  async remove(id: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOneBy({ id });
    if (!quiz) {
      throw new NotFoundException(`Quiz with id ${id} not found`);
    }
    await this.quizRepository.remove(quiz);

    return quiz;
  }
}
