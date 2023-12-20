import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComment } from "@/domain/enterprise/entities/answer-comment";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = []

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id)
    if (!answerComment) {
      return null
    }
    return answerComment
  }

  async findManByAnswerId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items.filter((item) => item.answerId.toString() === questionId).slice((page - 1) * 20, page * 20)

    return questionComments
  }
  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);   
  }


  async delete(answerComment: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answerComment.id)
    this.items.splice(itemIndex, 1)
  }

}