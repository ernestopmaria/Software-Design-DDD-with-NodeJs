import { Question } from "@/domain/enterprise/entities/question";
import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";


export class InMemoryQuestionRepositories implements QuestionRepository{
  public items : Question[]=[]
  async create(question: Question) {
    this.items.push(question);
  }

}