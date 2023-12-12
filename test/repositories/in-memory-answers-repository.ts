import { Answer } from "@/domain/enterprise/entities/answer";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";


export class InMemoryAnswersRepository implements AnswersRepository{
 public items:Answer[]=[]
  async create(answer: Answer) {
    this.items.push(answer);
  }

  }
  