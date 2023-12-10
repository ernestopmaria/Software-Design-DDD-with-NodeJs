import { Question } from "@/domain/enterprise/entities/question";
import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";



export class InMemoryQuestionRepository implements QuestionRepository {

  public items: Question[] = []

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)
    if (!question) {
      return null
    }
    return question
  }

  async create(question: Question) {
    this.items.push(question);
  }

}