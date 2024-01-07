import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
  findById (id:string):Promise<AnswerComment | null>
  findManByAnswerId(answerId: string,params: PaginationParams):Promise<AnswerComment []>
  delete(questionComment: AnswerComment): Promise<void>
  create(answerComment: AnswerComment): Promise<void>
}


