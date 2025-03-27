import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { handleError, successResponse, validateEmployeeAccess } from '@/lib/api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)

    const [education, workExperience, skills, languages] = await Promise.all([
      prisma.education.findMany({
        where: { employeeId: params.id },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.workExperience.findMany({
        where: { employeeId: params.id },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.skill.findMany({
        where: { employeeId: params.id },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.language.findMany({
        where: { employeeId: params.id },
        orderBy: { createdAt: 'desc' }
      })
    ])

    return successResponse({ education, workExperience, skills, languages })
  } catch (error) {
    return handleError(error)
  }
}

// Education endpoints
export async function POST_EDUCATION(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const education = await prisma.education.create({
      data: {
        employeeId: params.id,
        level: body.level,
        major: body.major,
        year: parseInt(body.year),
        score: body.score,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        institute: body.institute,
        comments: body.comments
      }
    })

    return successResponse(education)
  } catch (error) {
    return handleError(error)
  }
}

export async function PATCH_EDUCATION(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const education = await prisma.education.update({
      where: { id: body.id },
      data: {
        level: body.level,
        major: body.major,
        year: parseInt(body.year),
        score: body.score,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        institute: body.institute,
        comments: body.comments
      }
    })

    return successResponse(education)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE_EDUCATION(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const { searchParams } = new URL(request.url)
    const educationId = searchParams.get('id')

    if (!educationId) {
      return handleError({ message: 'Education ID is required', status: 400 })
    }

    await prisma.education.delete({
      where: { id: educationId }
    })

    return successResponse({ message: 'Education record deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
}

// Work Experience endpoints
export async function POST_WORK_EXPERIENCE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const workExperience = await prisma.workExperience.create({
      data: {
        employeeId: params.id,
        company: body.company,
        jobTitle: body.jobTitle,
        fromDate: new Date(body.fromDate),
        toDate: body.toDate ? new Date(body.toDate) : null,
        comments: body.comments
      }
    })

    return successResponse(workExperience)
  } catch (error) {
    return handleError(error)
  }
}

export async function PATCH_WORK_EXPERIENCE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const workExperience = await prisma.workExperience.update({
      where: { id: body.id },
      data: {
        company: body.company,
        jobTitle: body.jobTitle,
        fromDate: new Date(body.fromDate),
        toDate: body.toDate ? new Date(body.toDate) : null,
        comments: body.comments
      }
    })

    return successResponse(workExperience)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE_WORK_EXPERIENCE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const { searchParams } = new URL(request.url)
    const experienceId = searchParams.get('id')

    if (!experienceId) {
      return handleError({ message: 'Work Experience ID is required', status: 400 })
    }

    await prisma.workExperience.delete({
      where: { id: experienceId }
    })

    return successResponse({ message: 'Work experience deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
}

// Skills endpoints
export async function POST_SKILL(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const skill = await prisma.skill.create({
      data: {
        employeeId: params.id,
        name: body.name,
        yearsOfExperience: parseInt(body.yearsOfExperience),
        comments: body.comments
      }
    })

    return successResponse(skill)
  } catch (error) {
    return handleError(error)
  }
}

export async function PATCH_SKILL(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const skill = await prisma.skill.update({
      where: { id: body.id },
      data: {
        name: body.name,
        yearsOfExperience: parseInt(body.yearsOfExperience),
        comments: body.comments
      }
    })

    return successResponse(skill)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE_SKILL(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const { searchParams } = new URL(request.url)
    const skillId = searchParams.get('id')

    if (!skillId) {
      return handleError({ message: 'Skill ID is required', status: 400 })
    }

    await prisma.skill.delete({
      where: { id: skillId }
    })

    return successResponse({ message: 'Skill deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
}

// Languages endpoints
export async function POST_LANGUAGE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const language = await prisma.language.create({
      data: {
        employeeId: params.id,
        name: body.name,
        fluency: body.fluency,
        competency: body.competency,
        comments: body.comments
      }
    })

    return successResponse(language)
  } catch (error) {
    return handleError(error)
  }
}

export async function PATCH_LANGUAGE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const body = await request.json()

    const language = await prisma.language.update({
      where: { id: body.id },
      data: {
        name: body.name,
        fluency: body.fluency,
        competency: body.competency,
        comments: body.comments
      }
    })

    return successResponse(language)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE_LANGUAGE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await validateEmployeeAccess(params.id)
    const { searchParams } = new URL(request.url)
    const languageId = searchParams.get('id')

    if (!languageId) {
      return handleError({ message: 'Language ID is required', status: 400 })
    }

    await prisma.language.delete({
      where: { id: languageId }
    })

    return successResponse({ message: 'Language deleted successfully' })
  } catch (error) {
    return handleError(error)
  }
} 