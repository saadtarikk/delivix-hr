# UK HRMS - AI-Powered HRMS for Sponsor License Compliance

A modern, sleek Human Resource Management System (HRMS) designed to enable UK businesses to apply for sponsor licenses and manage employee compliance per UK Home Office regulations.

## Project Overview

### Objective
Develop a fully compliant HRMS that enables UK businesses to:
- Apply for and manage sponsor licenses
- Track employee compliance with UK Home Office regulations
- Manage employee records and documentation
- Generate compliance reports
- Monitor visa statuses and work eligibility

### Core Features
1. **Employee Records Management**
   - Right-to-Work verification
   - Visa expiry alerts
   - Personal data storage
   - Document management

2. **Sponsor License Compliance**
   - Audit logs
   - Document storage
   - Compliance monitoring
   - Automated reporting

3. **Work Scheduling & Attendance**
   - Absence tracking
   - Work compliance monitoring
   - Visa work hour restrictions

4. **Automated Home Office Reporting**
   - Compliance alerts
   - Data exports in Home Office formats
   - Audit-ready reports

5. **User Roles & Permissions**
   - Role-based access control
   - Compliance with Home Office guidelines
   - Admin, HR, and Employee roles

## Technical Stack

- **Frontend**: Next.js 13+ with App Router
- **UI Components**: shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/uk-hrms.git
   cd uk-hrms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your Supabase credentials and other configuration.

4. Run the development server:
   ```bash
   npm run dev
   ```

### Database Setup

1. Create a new Supabase project
2. Set up the database schema (will be provided in a separate migration file)
3. Configure authentication settings in Supabase
4. Set up storage buckets for document management

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Document complex logic and components

### Component Structure
- Use shadcn/ui components for consistent UI
- Follow atomic design principles
- Implement responsive design
- Ensure accessibility compliance

### Testing
- Write unit tests for critical functionality
- Implement integration tests for API routes
- Use Cypress for end-to-end testing

## Compliance Requirements

### Data Retention
- Employee records must be retained for 6 years
- Audit logs must be preserved
- Document storage must be GDPR compliant

### Security
- Implement role-based access control
- Encrypt sensitive data
- Follow UK data protection regulations
- Regular security audits

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary and confidential. All rights reserved.

## Support

For support, please contact the development team or raise an issue in the repository.
