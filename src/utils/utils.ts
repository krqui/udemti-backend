export async function getByName({ students, name }) {
  return students.filter(students =>
    students.name.toLowerCase().includes(name.toLowerCase()),
  )
}

export async function getBySurname({ students, name }) {
  return students.filter(students =>
    students.surname.toLowerCase().includes(name.toLowerCase()),
  )
}

// Lo que aqui consegui programar es que aquellos alumnos (element) que posean un determinado curso, sean pusheados a un array titulado arr.
// En caso de que el "element" NO posea el curso buscado, entonces se le asigna el valor de un array vacio. Mientras que de encontrarse el valor, entonces el alumno (element) si posee el curso solicitado.
export async function getByCourse({ students, course }) {
  let arr = []
  await students.map(element => {
    let propertyFounded = element.courses.filter(e => e.title.includes(course))

    if (propertyFounded.length > 0) {
      arr.push(element)
    }
  })
  return arr
}

export async function getByStatus({ students, status }) {
  if (status === 'Enrolled')
    students = students.filter(student => student.status === 'Enrolled')
  if (status === 'NotEnrolled')
    students = students.filter(student => student.status === 'NotEnrolled')
  if (status === 'Disenrolled')
    students = students.filter(student => student.status === 'Disenrolled')
  return students
}

export async function getByNationality({ students, nationality }) {
  return students.filter(students =>
    students.nationality.toLowerCase().includes(nationality.toLowerCase()),
  )
}

export async function getByDni({ students, dni }) {
  let filtDNI = []
  await students.map(student => {
    if (student.DNI.toString() === dni) {
      filtDNI.push(student)
    }
  })
  return filtDNI
}

export async function sortNames({ students, sortName }) {
  if (sortName === 'AZ') {
    students = students.sort((a, b) => {
      if (a.name > b.name) return 1
      if (a.name < b.name) return -1
      return 0
    })
  }
  if (sortName === 'ZA') {
    students ===
      students.sort((a, b) => {
        if (a.name < b.name) return 1
        if (a.name > b.name) return -1
        return 0
      })
  }
  if (sortName === 'SAZ') {
    students = students.sort((a, b) => {
      if (a.surname > b.surname) return 1
      if (a.surname < b.surname) return -1
      return 0
    })
  }
  if (sortName === 'SZA') {
    students ===
      students.sort((a, b) => {
        if (a.surname < b.surname) return 1
        if (a.surname > b.surname) return -1
        return 0
      })
  }
  return students
}
