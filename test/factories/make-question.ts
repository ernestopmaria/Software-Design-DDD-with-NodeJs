import {faker } from '@faker-js/faker'

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";


export function makeQuestion(
  override : Partial<QuestionProps>={},
  id?: UniqueEntityID
) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: faker.lorem.sentence({min: 1, max: 4}),
    content: faker.lorem.text(),
    ...override
  },
  id)
  return question
}