export type CreateAlumnoParams = {
  name: string
  surname: string
  birthdate: string
  nationality: string
  DNI: number
  coursesIds: number[]
}

export type CreateCourseParams = {
  title: string
}
