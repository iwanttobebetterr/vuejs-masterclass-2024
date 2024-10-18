import { createClient } from '@supabase/supabase-js'
import { fakerEN_US as faker } from '@faker-js/faker'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY,
)

const seedProjects = async numEntries => {
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projects.push({
      name: name,
      slug: name.toLocaleLowerCase().replace(/\s/g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    })
  }

  const { data, error } = await supabase.from('projects').insert(projects)

  if (error) {
    console.error('Error seeding projects:', error.message)
  } else {
    console.log('Projects seeded:', data)
  }
}

await seedProjects(10)
