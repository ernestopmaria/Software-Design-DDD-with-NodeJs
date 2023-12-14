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

  async create(answer: Answer) {
    this.items.push(answer);
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(itemIndex, 1)
  }
}

