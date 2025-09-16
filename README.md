# Centralised Student Activity Record Platform (SIH25093)

## Overview
This project provides a unified, verified digital platform for capturing and managing student co-curricular and extra-curricular activities across Higher Education Institutions (HEIs). It addresses challenges related to fragmented records, manual verification, and audit readiness by standardizing activity capture, evidence uploads, faculty approvals, real-time dashboards, and ready-to-export reports aligned with accreditation standards.

## Purpose and Problem Statement
- Fragmented student activity records across departments and institutions create inefficiencies in accreditation (NAAC, AICTE), placement, and scholarship evaluations.  
- The lack of a unified, verifiable system leads to delays, audit challenges, and trust deficits in reported achievements.  
- This platform streamlines submission, verification, and analytics workflows to provide trusted, comprehensive evidence for quality assurance and student progression.

## Core Features
### Student Portal
- Dynamic dashboard with real-time status updates, activity tracking, and LeetCode-style attendance heatmap (subject-wise & event check-ins).  
- Controlled taxonomy covering NSS, NCC, sports, hackathons, volunteering, internships, MOOCs, certifications, cultural activities.  
- Evidence uploads with checksum validations and secure storage (presigned URLs).  
- Verified digital portfolio generation (downloadable PDF and shareable web link) for placements, scholarships, and higher studies.  
- LMS integration for syncing MOOCs, internships, and attendance data.

### Faculty/Admin Portal
- Approval panel with live queues, bulk actions, and SLA tracking (Avg TAT metrics).  
- Detailed verification interface showing activity metadata, evidence preview, audit trails, and comments.  
- Reporting dashboard with export presets aligned to NAAC AQAR/SSR, AICTE, NIRF frameworks.  
- Notifications and workload management with alerts for SLA breaches and backlogs.  
- Integration settings for LMS and taxonomy management.

### Institution Admin Portal
- Institution-wide dashboards showcasing total activities, approval metrics, participation rates, and compliance indicators.  
- One-click report generation for individual student performance and entire college reports tailored for NAAC, AICTE, and NIRF requirements.  
- Evidence room with read-only access to approved proofs for audits.  
- Role-based management and policy configuration.

## Technical Stack
- Frontend: React-based portals using **shadcn/ui** library for a minimal, accessible, and clean UI/UX.  
- Backend: Modular microservices with Authentication & RBAC, Verification Service, Portfolio Generator, Notifications, Analytics/Reports, and File Handling.  
- Database: PostgreSQL with JSONB support for flexible taxonomy and metadata storage.  
- Storage: S3-compatible object storage with presigned URLs for secure proof uploads/downloads.  
- Real-time: Event-driven updates for live status changes, KPIs, and attendance logs (FaceLog, QR/OTP).  
- Integration: Connectors for LMS/ERP for seamless data sync and consistent records.  
- Reporting: Export templates and analytics dashboards aligned with NAAC, AICTE, NIRF standards.

## How It Works (Architecture)

<img width="553" height="408" alt="image" src="https://github.com/user-attachments/assets/a999a117-2514-4351-8794-e0791bc2e616" />
 
- Student, Faculty/Admin, and Institution Admin portals communicate via a secured API Gateway.  
- Backend services handle business logic including authentication, verification workflow, portfolio generation, notification dispatch, and analytics computation.  
- Data is persisted in a centralized database with audit logs and evidence stored via secure object storage.  
- Real-time event streaming ensures transparency and immediate feedback on submissions and approvals.

## Feasibility and Viability
- Built on reusable UI components and modular backend services for accelerated development and scalability.  
- Flexible data schema minimizes disruption when taxonomy or reporting requirements evolve.  
- Risk mitigations include workload balancing, SLA monitoring, audit trails for data integrity, and user-friendly designs to boost adoption.  
- Targeted at IQAC/NAAC cells, placement teams, and institutional administrators for immediate impact.

## Impact and Benefits
- Empowers students with verified, holistic profiles enhancing chances for placements and scholarships.  
- Equips faculty and admins with efficient verification tools minimizing delays and manual effort.  
- Provides institutions with audit-ready dashboards and compliant report exports, reducing administrative burden and improving quality assurance.  
- Promotes data-driven decision-making through rich analytics on participation and compliance.

## References and Research
- NAAC AQAR and IQAC guidelines emphasizing evidence-supported student progression documentation.  
- NIRF ranking frameworks stressing dataset transparency, integrity, and aligned reporting.  
- Academic research linking extracurricular engagement with employability, supporting portfolio and eligibility tagging features.  
- Studies highlighting barriers to participation reinforcing design choices for simplified submissions, notifications, and live status feedback.


<img width="148" height="76" alt="image" src="https://github.com/user-attachments/assets/d7e15f45-5ca6-4e6f-9c58-4192414f2d2d" />
<img width="171" height="76" alt="image" src="https://github.com/user-attachments/assets/0e8c79f1-fc87-438c-b154-7ea5a9f9d960" />
<img width="148" height="76" alt="image" src="https://github.com/user-attachments/assets/67b7d765-94ab-41e2-87be-c94e79ab6dba" />


## Usage and Contributions
- Clone the repository, install dependencies, and follow setup instructions for frontend/backend deployments.  
- Contributions focused on enhancing taxonomy, integrations, UI/UX refinements, and analytics features are welcome.
