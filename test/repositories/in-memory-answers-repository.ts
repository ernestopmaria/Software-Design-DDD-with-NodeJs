import { PaginationParams } from "@/core/repositories/pagination-params";
import { Answer } from "@/domain/enterprise/entities/answer";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";


export class InMemoryAnswersRepository implements AnswersRepository {


  public items: Answer[] = []

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)
    if (!question) {
      return null
    }
    return question
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items.filter((item) => item.questionId.toString() === questionId).slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items[itemIndex] = answer
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(itemIndex, 1)
  }
}

