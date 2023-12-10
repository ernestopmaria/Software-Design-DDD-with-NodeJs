import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/enterprise/entities/question";
import { Slug } from "@/domain/enterprise/entities/value-objects/slug";


export function makeQuestion(
  override : Partial<QuestionProps>={}
) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: 'Melhor pais',
    slug: Slug.create('melhor-pais'),
    content: 'Qual e o melhor pais para se viver?',
    ...override
  })
  return question
}