"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function QualificationsPage({ params }: { params: { id: string } }) {
  // TODO: Fetch qualifications from API
  const education = [
    {
      id: 1,
      level: 'Bachelor of Science',
      major: 'Computer Science',
      year: 2015,
      score: '2:1',
      startDate: '2011-09-01',
      endDate: '2015-06-30',
      institute: 'University of London',
      comments: 'BSc in Computer Science'
    }
  ]

  const workExperience = [
    {
      id: 1,
      company: 'Tech Corp',
      jobTitle: 'Software Engineer',
      fromDate: '2015-07-01',
      toDate: '2018-06-30',
      comments: 'Full stack development'
    },
    {
      id: 2,
      company: 'Current Company',
      jobTitle: 'Senior Software Engineer',
      fromDate: '2018-07-01',
      toDate: 'Present',
      comments: 'Leading development team'
    }
  ]

  const skills = [
    {
      id: 1,
      name: 'JavaScript',
      yearsOfExperience: 8,
      comments: 'Advanced level'
    },
    {
      id: 2,
      name: 'Python',
      yearsOfExperience: 5,
      comments: 'Intermediate level'
    }
  ]

  const languages = [
    {
      id: 1,
      name: 'English',
      fluency: 'Native',
      competency: 'Reading',
      comments: 'Primary language'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Qualifications</h1>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Qualification
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{edu.level}</p>
                    <span className="text-sm text-muted-foreground">({edu.major})</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Institute: {edu.institute}</span>
                    <span>Year: {edu.year}</span>
                    <span>Score: {edu.score}</span>
                    <span>Period: {edu.startDate} to {edu.endDate}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{edu.comments}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div
                key={exp.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{exp.jobTitle}</p>
                    <span className="text-sm text-muted-foreground">({exp.company})</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Period: {exp.fromDate} to {exp.toDate}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.comments}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{skill.name}</p>
                    <span className="text-sm text-muted-foreground">({skill.yearsOfExperience} years)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{skill.comments}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{lang.name}</p>
                    <span className="text-sm text-muted-foreground">({lang.fluency})</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Competency: {lang.competency}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{lang.comments}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 