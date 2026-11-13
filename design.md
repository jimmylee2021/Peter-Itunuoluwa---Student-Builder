# Personal Portfolio Website --- Product Requirements & AI Build Specification

> **Purpose:** This document is the single source of truth for designing
> and building a personal portfolio website with a public blog and a
> secure, functional admin dashboard. An AI coding assistant or
> developer should be able to use it to plan, implement, test, and
> deploy the project without guessing the core requirements.

------------------------------------------------------------------------

## 1. Project Overview

Build a modern, responsive personal portfolio for **Itunuoluwa
Adejimi**, a Computer Science student, frontend developer, technology
learner, community/program organiser, and aspiring technology
professional.

The website should do more than display a CV. It should communicate the
user's journey as a **student, builder, and entrepreneur**; showcase
practical work; document learning; establish credibility; and make it
easy for potential clients, employers, collaborators, and community
members to get in touch.

The website must include:

1.  A polished public portfolio.
2.  A working blog with individual post pages.
3.  A secure admin dashboard for managing blog posts and selected
    portfolio content.
4.  Persistent database storage.
5.  Authentication and protected admin routes.
6.  Responsive layouts for mobile, tablet, and desktop.

**Important:** This is a real application, not a static mock-up. Blog
posts must be stored in a database and remain available after refresh or
redeployment. Admin actions must work end to end.

------------------------------------------------------------------------

## 2. Goals and Success Criteria

### Primary goals

-   Present a clear, credible professional identity.
-   Showcase projects, skills, learning progress, and relevant
    experience.
-   Publish useful technology articles and personal build-in-public
    updates.
-   Allow the site owner to create, edit, publish, unpublish, and delete
    blog posts without changing code.
-   Make the website easy to maintain and extend as the user's career
    develops.
-   Support contact and collaboration enquiries.

### Success criteria

-   A visitor can understand who the owner is and what they do within a
    few seconds.
-   A visitor can browse projects and open full blog articles.
-   The owner can sign in securely and manage posts from the dashboard.
-   Published posts appear on the public blog; drafts do not.
-   Changes persist in the database.
-   All important pages work on mobile and desktop.
-   The site has sensible SEO metadata, accessible controls, loading
    states, and error handling.

------------------------------------------------------------------------

## 3. Personal Brand and Positioning

### Core identity

**Name:** Itunuoluwa Adejimi\
**Brand direction:** Student • Builder • Entrepreneur\
**Professional positioning:** Computer Science student and frontend
developer interested in building practical digital products, solving
real-world problems, and exploring the intersection of technology,
people, and business.

### Suggested short introduction

"I'm a Computer Science student and frontend developer who enjoys
turning ideas into useful digital experiences. I document what I'm
learning, build practical projects, and explore how technology can solve
real problems."

Treat this as editable draft copy. The owner should be able to revise it
later.

### Content pillars

Use these pillars to organise portfolio and blog content:

1.  **Building:** Projects, experiments, product ideas, implementation
    notes, and lessons from shipping.
2.  **Learning:** Technology concepts, tutorials followed, skills being
    developed, and lessons learned.
3.  **Technology explained:** Accessible explanations of technology
    beyond only web development or software engineering.
4.  **Entrepreneurship and problem-solving:** Digital product ideas,
    business experiments, and technology for real-world needs.
5.  **Community and leadership:** Technology communities, events,
    programme coordination, collaboration, and volunteering.

The site should communicate curiosity and practical growth. Do not
present the owner as a senior engineer, experienced project manager, or
expert in areas where that experience has not been established.

------------------------------------------------------------------------

## 4. Intended Audience

Design for these visitor groups:

-   Recruiters and hiring managers.
-   Potential freelance clients and small businesses.
-   Developers and technology professionals.
-   Startup founders and potential collaborators.
-   Students and people following the owner's learning journey.
-   Technology communities and event organisers.

Each group should be able to find relevant information without
navigating a complicated site.

------------------------------------------------------------------------

## 5. Sitemap and Navigation

### Public routes

  -----------------------------------------------------------------------
  Route                               Purpose
  ----------------------------------- -----------------------------------
  `/`                                 Homepage and main introduction

  `/about`                            Background, interests, approach,
                                      and career direction

  `/projects`                         Project portfolio

  `/projects/[slug]`                  Individual project details

  `/blog`                             Published blog listing

  `/blog/[slug]`                      Full blog article

  `/contact`                          Contact information and enquiry
                                      form

  `/admin/login`                      Admin sign-in

  `/admin`                            Protected dashboard overview

  `/admin/posts`                      Manage blog posts

  `/admin/posts/new`                  Create a post

  `/admin/posts/[id]/edit`            Edit a post

  `/admin/projects`                   Manage portfolio projects, if
                                      project management is implemented
  -----------------------------------------------------------------------

The admin area must not appear as a public navigation item. It is
accessed through its direct URL.

### Main navigation

-   Home
-   About
-   Projects
-   Blog
-   Contact

Include a clear **Let's Talk** or **Contact Me** call to action. On
mobile, use an accessible collapsible menu.

------------------------------------------------------------------------

## 6. Visual and User Experience Direction

### Overall look

Create a clean, minimal, editorial-style portfolio. It should feel
personal, thoughtful, modern, and professional rather than like a
generic developer template.

Suggested direction:

-   Strong typography and clear visual hierarchy.
-   Generous whitespace.
-   Restrained use of colour.
-   Simple borders and subtle shadows.
-   Well-spaced cards for projects and articles.
-   Small, purposeful motion only where it improves the experience.
-   Consistent spacing, radii, buttons, and layout rules.

Do not over-design the site. Avoid excessive gradients, glassmorphism,
animated backgrounds, giant decorative graphics, or too many competing
colours.

### Suggested design tokens

These are starting points, not rigid rules. Use a consistent design
system and keep colours easy to change.

-   Background: warm white or very light neutral.
-   Main text: near-black or deep charcoal.
-   Secondary text: muted grey.
-   Accent: one distinctive colour, such as deep blue, indigo, or forest
    green.
-   Borders: light neutral grey.
-   Cards: white or a slightly contrasting neutral.
-   Typography: a highly readable sans-serif for interface text; an
    optional complementary display face for headings.

Support light mode first. Dark mode can be added if it can be
implemented without compromising consistency or delivery.

### Responsive behaviour

-   Mobile: single-column layouts, readable type, comfortable touch
    targets, compact navigation.
-   Tablet: balanced two-column sections where appropriate.
-   Desktop: use a centred content container with a comfortable maximum
    width.
-   Avoid horizontal overflow at all common screen sizes.
-   Images must resize cleanly and use appropriate aspect ratios.

### Accessibility

-   Use semantic HTML landmarks and heading order.
-   Provide visible keyboard focus states.
-   Ensure sufficient colour contrast.
-   Add descriptive alt text to meaningful images.
-   Associate form labels with inputs.
-   Make menus, dialogs, and controls keyboard accessible.
-   Respect reduced-motion preferences.

------------------------------------------------------------------------

## 7. Homepage Requirements

The homepage should provide a clear overview and guide visitors to the
most useful sections.

### Section 1: Hero

Include:

-   Owner's name.
-   A concise professional headline.
-   A short introduction.
-   Primary CTA: **View My Work**.
-   Secondary CTA: **Read the Blog** or **Contact Me**.
-   Optional portrait or simple visual element. Do not generate or use a
    fake professional photograph.

Possible headline:

**"I build, learn, and explore technology through practical projects."**

Possible supporting copy:

"I'm Itunuoluwa, a Computer Science student and frontend developer
interested in creating useful digital experiences and solving real-world
problems with technology."

Keep the copy editable.

### Section 2: Brief introduction

A short paragraph explaining the owner's interest in technology,
building products, and documenting the learning journey. Link to the
About page.

### Section 3: Featured projects

Show 3--4 selected projects in attractive cards.

Each project card should include:

-   Project name.
-   Short description.
-   Relevant image or screenshot.
-   Technology stack.
-   Project status, if useful.
-   Live demo link, if available.
-   Source code link, if public.
-   Link to a detailed project page.

Only display real project information and working links. Use clearly
labelled placeholders where details are not yet supplied.

### Section 4: What I'm exploring

Use a small set of editable interest areas, such as:

-   Frontend development and React.
-   Building practical digital products.
-   Technical customer success and support.
-   Technology education and explainers.
-   Product, programme, and community operations.

Do not imply professional mastery of every area. Present these as
interests or current learning directions where appropriate.

### Section 5: Latest writing

Display the 3 most recent published blog posts, including:

-   Cover image or tasteful fallback.
-   Category.
-   Title.
-   Short excerpt.
-   Publication date.
-   Reading time.
-   Link to the full article.

If there are no published posts, show a useful empty state rather than a
broken section.

### Section 6: Contact CTA

Invite visitors to discuss opportunities, projects, collaborations, or
useful ideas. Include a contact link and relevant social links.

### Footer

Include:

-   Name or wordmark.
-   Short positioning statement.
-   Navigation links.
-   Social links.
-   Copyright year generated dynamically.
-   Optional email link.

------------------------------------------------------------------------

## 8. About Page

The About page should tell a genuine, evolving story rather than read
like an inflated CV.

Suggested sections:

1.  **My story:** Computer Science studies and interest in technology.
2.  **How I approach building:** Understand the problem, break it into
    manageable parts, research, plan the interface, build, test, and
    improve.
3.  **What I'm learning:** Current skills and areas of exploration.
4.  **What matters to me:** Practical solutions, continuous learning,
    collaboration, and technology that can create useful impact.
5.  **Current direction:** The kinds of roles, projects, and
    collaborations the owner is exploring.

Include an optional downloadable CV only after the owner supplies the
correct file.

------------------------------------------------------------------------

## 9. Projects Page and Project Content

The projects page should make practical work easy to browse.

### Initial project candidates

Use the following as possible starting entries. Confirm exact
descriptions, status, screenshots, and URLs with the owner before
publishing them as completed work.

  -------------------------------------------------------------------------
  Project                 Current known context     Suggested presentation
  ----------------------- ------------------------- -----------------------
  Builders.log            A minimal React tech blog Personal publishing
                          concept with an admin     platform /
                          dashboard and Supabase    build-in-public project
                          authentication/database   
                          planned                   

  Kanban Task Manager     The owner has been        Task management
                          working on a Kanban-style application; clearly
                          task manager after        state current
                          building a Todo list      completion status

  Todo List               Built while applying      React learning project
                          practical React knowledge 

  Student Job and         A product concept aimed   Product concept / UI
  Internship Marketplace  at helping students find  and problem exploration
                          jobs and internships      

  Kolekto                 A contribution-collection Product concept; do not
                          product concept for       imply it is launched
                          students, organisations,  
                          and businesses            
  -------------------------------------------------------------------------

Do not fabricate metrics, users, revenue, client outcomes, or production
deployment.

### Project detail page

Each project should support:

-   Project title and short summary.
-   Problem being addressed.
-   Intended users.
-   The owner's role and contribution.
-   Features.
-   Technology used.
-   Challenges and lessons.
-   Screenshots.
-   Live demo and repository links, when available.
-   Current status: Idea, In Progress, Completed, or Archived.

Clearly distinguish a concept, an in-progress build, and a completed
product.

------------------------------------------------------------------------

## 10. Blog Requirements

The blog is a core feature, not a decorative page.

### Blog listing page

Display published posts only.

Each post preview should show:

-   Cover image (optional).
-   Title.
-   Excerpt.
-   Category.
-   Tags.
-   Publication date.
-   Estimated reading time.
-   Author name.
-   Link to the full post.

Include:

-   Search by title and content, if practical.
-   Category filtering.
-   Pagination or a **Load More** interaction.
-   Empty state when no posts match.
-   Loading and error states.

### Blog article page

Each article page should include:

-   Title.
-   Excerpt or subtitle.
-   Author.
-   Published date.
-   Updated date when relevant.
-   Category and tags.
-   Cover image, if provided.
-   Readable article body.
-   Estimated reading time.
-   Social sharing metadata.
-   Link back to the blog.
-   Related posts, if available.
-   Optional previous/next navigation.

The article layout should prioritise readability: a comfortable text
width, clear heading hierarchy, good paragraph spacing, and responsive
images.

### Blog writing direction

The blog should reflect the owner's real interests and learning journey.
Potential categories:

-   Technology Explained
-   Web Development
-   Building in Public
-   Projects and Experiments
-   Career and Learning
-   Entrepreneurship
-   Community and Technology

Potential initial article topics:

-   How can a 10GB file become 2GB after compression?
-   What I learned while building a Kanban task manager with React.
-   Understanding routing in React: concepts, examples, and lessons.
-   What makes a useful digital product?
-   Lessons from organising or participating in technology communities.

Do not claim that the owner built a project after merely following a
tutorial. Keep learning notes honest and specific.

------------------------------------------------------------------------

## 11. Admin Dashboard Requirements

The admin dashboard must be private, authenticated, and functional.

### Authentication

Use Supabase Auth or an equivalent secure authentication provider.

Requirements:

-   Email and password sign-in.
-   Sign-out.
-   Protected admin routes.
-   Session persistence and sensible expiry handling.
-   Password reset flow, if supported by the selected provider.
-   Only explicitly authorised admin accounts may access the dashboard.
-   Do not expose a public admin registration page.
-   Do not store passwords in the application database or source code.
-   Never hardcode secret keys in frontend code.

For a single-owner portfolio, create the first admin account through the
provider's secure dashboard or a documented setup process. Do not allow
anyone to become an admin by simply visiting `/admin`.

### Dashboard overview

Show useful summary cards:

-   Total posts.
-   Published posts.
-   Draft posts.
-   Recently updated posts.

These values must come from the database, not hardcoded sample numbers.

Include quick actions:

-   Create new post.
-   View published blog.
-   Manage posts.

### Post management

The owner must be able to:

-   Create a new post.
-   Save a post as a draft.
-   Edit an existing post.
-   Preview a post before publishing.
-   Publish a draft.
-   Unpublish a published post.
-   Delete a post after confirmation.
-   Search posts.
-   Filter by status or category.
-   View publication and last-updated dates.

Show clear success and error feedback after each action.

### Post editor

Keep the first version simple and reliable. A Markdown editor or a
well-implemented rich text editor is acceptable. Prefer a
straightforward editor over a complex page builder.

Required fields:

-   Title.
-   Slug, generated from the title but editable.
-   Excerpt.
-   Main content.
-   Category.
-   Tags.
-   Cover image URL or upload.
-   Status: Draft or Published.
-   SEO title.
-   SEO description.
-   Publication date, managed automatically unless the owner chooses to
    schedule posts.

Editor behaviour:

-   Validate required fields.
-   Warn before leaving with unsaved changes.
-   Prevent duplicate slugs.
-   Provide preview.
-   Show a useful word count or reading-time estimate.
-   Keep draft content private.
-   Confirm before deletion.

### Image handling

If using Supabase Storage:

-   Store images in a dedicated bucket.
-   Validate file type and size.
-   Use safe, unique file names.
-   Display upload progress and errors.
-   Restrict write/delete access to authorised admins.
-   Use public read access only for assets intended to be public.

Do not store large image binaries directly in ordinary post text fields.

### Optional future dashboard features

These are not required for the first release:

-   Portfolio project management.
-   Scheduled publishing.
-   Blog analytics.
-   Multiple admin roles.
-   Newsletter management.
-   Comment moderation.

Build the system so these can be added later without a full rewrite.

------------------------------------------------------------------------

## 12. Contact Page and Form

Provide a simple contact page with:

-   A short invitation.
-   Email address supplied by the owner.
-   Social/profile links supplied by the owner.
-   Contact form with name, email, subject, and message.

Form requirements:

-   Client-side and server-side validation.
-   Clear success and failure states.
-   Spam protection or rate limiting appropriate to the chosen backend.
-   Do not expose email service credentials.
-   Do not claim a message was sent unless the backend confirms it.

If a reliable email service is not configured, provide a working email
link as a fallback rather than a fake form submission.

------------------------------------------------------------------------

## 13. Suggested Technology Stack

Prefer a stack that is modern, maintainable, affordable to host, and
approachable for a developer with practical HTML, CSS, JavaScript, and
React experience.

### Recommended stack

  -----------------------------------------------------------------------
  Layer                   Recommendation          Reason
  ----------------------- ----------------------- -----------------------
  Frontend                React with Next.js and  React-based
                          TypeScript              development, routing,
                                                  SEO support, and server
                                                  capabilities

  Styling                 CSS Modules or Tailwind Consistent responsive
                          CSS                     styling

  UI icons                Lucide React            Consistent lightweight
                                                  icon set

  Backend/database        Supabase                PostgreSQL database,
                                                  authentication, and
                                                  storage

  Authentication          Supabase Auth           Secure admin sign-in

  Content                 Markdown stored in      Simple authoring and
                          database, or a          reliable rendering
                          structured rich-text    
                          format                  

  Hosting                 Vercel or another       Straightforward
                          compatible host         deployment

  Version control         Git and GitHub          Source control and
                                                  deployment workflow
  -----------------------------------------------------------------------

An equivalent stack is acceptable if the AI explains why it is a better
fit. Do not introduce unnecessary services or complex architecture.

### Important implementation rule

Use current stable versions and official documentation for framework and
SDK setup. Do not invent deprecated APIs. Keep dependencies minimal.

------------------------------------------------------------------------

## 14. Database Design

Use PostgreSQL through Supabase.

### `posts` table

Suggested fields:

  Field               Type                  Notes
  ------------------- --------------------- ------------------------------------------
  `id`                UUID                  Primary key
  `title`             Text                  Required
  `slug`              Text                  Required and unique
  `excerpt`           Text                  Short summary
  `content`           Text or JSONB         Article body, depending on editor format
  `cover_image_url`   Text                  Nullable
  `category`          Text                  Nullable or linked to categories
  `tags`              Text array or JSONB   Optional
  `status`            Text/enum             `draft` or `published`
  `seo_title`         Text                  Optional
  `seo_description`   Text                  Optional
  `author_name`       Text                  Default to Itunuoluwa Adejimi
  `published_at`      Timestamp             Nullable until published
  `created_at`        Timestamp             Default current time
  `updated_at`        Timestamp             Updated on changes

Add a database constraint to ensure slugs are unique. Validate status
values.

### Optional `projects` table

If project management is included, create a table with:

-   `id`
-   `title`
-   `slug`
-   `short_description`
-   `problem`
-   `role`
-   `features`
-   `tech_stack`
-   `status`
-   `cover_image_url`
-   `gallery`
-   `live_url`
-   `repository_url`
-   `featured`
-   `sort_order`
-   `created_at`
-   `updated_at`

### Security and Row Level Security (RLS)

Enable RLS on tables exposed through Supabase.

At minimum:

-   Public visitors can read only posts with `status = 'published'`.
-   Anonymous visitors cannot create, edit, publish, or delete posts.
-   Authenticated admin access must be restricted to an explicitly
    authorised user or role.
-   Only authorised admins can insert, update, or delete posts.
-   Storage write/delete policies must also restrict access to admins.
-   Do not rely only on hiding admin buttons in the frontend. Enforce
    permissions in the database.
-   Keep the Supabase service-role key on the server only. Never expose
    it in browser code.

Provide the SQL migration/schema and the RLS policies as part of the
project.

------------------------------------------------------------------------

## 15. Application Architecture and Code Quality

Use a clear, maintainable folder structure. A possible Next.js App
Router structure:

``` text
src/
  app/
    (public)/
      page.tsx
      about/page.tsx
      projects/page.tsx
      projects/[slug]/page.tsx
      blog/page.tsx
      blog/[slug]/page.tsx
      contact/page.tsx
    admin/
      login/page.tsx
      page.tsx
      posts/page.tsx
      posts/new/page.tsx
      posts/[id]/edit/page.tsx
    api/
      contact/route.ts
  components/
    layout/
    navigation/
    home/
    projects/
    blog/
    forms/
    admin/
    ui/
  lib/
    supabase/
    auth/
    validation/
    seo/
    utils/
  types/
  styles/
  middleware.ts
```

Adapt this structure to the selected framework version. Do not create
empty abstractions just to match the example.

### Code standards

-   Use reusable components where they genuinely reduce duplication.
-   Keep components focused and reasonably small.
-   Use TypeScript types for database records and component props.
-   Keep database queries and privileged operations out of client
    components.
-   Validate user input at the appropriate boundaries.
-   Use environment variables for configuration.
-   Include useful loading, empty, and error states.
-   Avoid placeholder buttons and dead links.
-   Avoid unnecessary dependencies.
-   Keep naming consistent and code readable.
-   Do not put the entire application into one component.

------------------------------------------------------------------------

## 16. SEO, Performance, and Sharing

Implement:

-   Unique page titles and descriptions.
-   Open Graph metadata for blog posts and key pages.
-   Canonical URLs where appropriate.
-   Sitemap.
-   `robots.txt`.
-   Descriptive URLs and readable slugs.
-   Structured data where appropriate, such as Person and BlogPosting.
-   Optimised, responsive images.
-   Lazy loading for below-the-fold images.
-   Sensible font loading.
-   Avoid unnecessary client-side JavaScript.

Use the deployed production domain for canonical URLs and social
metadata. Keep the domain configurable until it is known.

------------------------------------------------------------------------

## 17. Security and Reliability

Treat the admin dashboard as a security-sensitive part of the
application.

Required safeguards:

-   Server-side authorisation for admin operations.
-   Supabase RLS policies.
-   No service-role key in client bundles.
-   Input validation and sanitisation.
-   Safe rendering of blog content to prevent cross-site scripting.
-   Secure handling of uploaded files.
-   Rate limiting or spam protection for public forms.
-   No secrets committed to Git.
-   Useful error messages that do not reveal secrets or internal stack
    traces.
-   Confirmation for destructive actions.
-   Test direct access to protected URLs while signed out.

Do not build custom password storage or authentication when a trusted
provider is available.

------------------------------------------------------------------------

## 18. Environment Variables and Setup

Create a `.env.example` containing variable names only, with no real
secrets.

For a Supabase setup, likely variables include:

``` env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

Use the exact environment variable names required by the chosen
implementation. The service-role key must only be used in trusted
server-side code.

Provide a README explaining:

1.  Required software.
2.  How to install dependencies.
3.  How to configure environment variables.
4.  How to create the Supabase project.
5.  How to run database migrations and RLS policies.
6.  How to create the first admin user securely.
7.  How to run the app locally.
8.  How to build and test.
9.  How to deploy.
10. How to add and manage blog posts.

Never ask the owner to paste secret keys into public source files or
commit them to GitHub.

------------------------------------------------------------------------

## 19. Testing and Acceptance Checklist

Do not consider the project complete until the following have been
tested.

### Public website

-   [ ] Homepage loads without errors.
-   [ ] Navigation works on desktop and mobile.
-   [ ] About page displays accurate information.
-   [ ] Projects listing and detail pages work.
-   [ ] Blog listing displays published posts only.
-   [ ] Individual blog pages load by slug.
-   [ ] Draft posts cannot be viewed publicly.
-   [ ] Search and category filters work if implemented.
-   [ ] Contact links work.
-   [ ] Contact form has real validation and backend handling, or a
    clear email fallback.
-   [ ] All external links are valid or clearly marked as placeholders.

### Admin

-   [ ] Signed-out users cannot access protected dashboard pages.
-   [ ] Invalid credentials are handled safely.
-   [ ] An authorised admin can sign in and sign out.
-   [ ] Admin can create a draft.
-   [ ] Admin can preview a draft.
-   [ ] Admin can publish a post.
-   [ ] Published post appears on the public blog.
-   [ ] Admin can edit a post and changes persist.
-   [ ] Admin can unpublish a post.
-   [ ] Admin can delete a post after confirmation.
-   [ ] Duplicate slugs are rejected or resolved safely.
-   [ ] Dashboard counts reflect database records.
-   [ ] Upload permissions work as intended, if uploads are enabled.

### Quality

-   [ ] No horizontal overflow on common mobile widths.
-   [ ] Keyboard navigation works.
-   [ ] Forms have labels and useful validation.
-   [ ] Loading, empty, and error states are present.
-   [ ] No secrets are exposed in the client bundle or repository.
-   [ ] Database RLS policies are enabled and tested.
-   [ ] Production build succeeds.
-   [ ] No major console errors or broken routes.

------------------------------------------------------------------------

## 20. Build Plan --- Work in Phases

Build incrementally. Do not attempt to generate the entire application
in one enormous code response.

### Phase 1 --- Foundation

-   Confirm framework and dependencies.
-   Create the application.
-   Set up TypeScript and styling.
-   Establish design tokens and typography.
-   Build shared layout, navigation, and footer.
-   Confirm responsive behaviour.

**Deliverable:** A working public shell with consistent styling.

### Phase 2 --- Public portfolio

-   Build homepage.
-   Build About page.
-   Build Projects listing and project detail template.
-   Add accurate starter content.
-   Build Contact page and functional contact method.

**Deliverable:** A complete public portfolio without the blog CMS.

### Phase 3 --- Database and blog

-   Create Supabase project and schema.
-   Configure RLS.
-   Connect the application to Supabase.
-   Build blog listing and article pages.
-   Add published/draft filtering.
-   Add categories, tags, search, and pagination as appropriate.

**Deliverable:** A public blog powered by real database content.

### Phase 4 --- Admin authentication and dashboard

-   Configure Supabase Auth.
-   Create secure admin access.
-   Protect admin routes and server actions.
-   Build dashboard overview.
-   Build post list and filters.

**Deliverable:** A private admin area that only authorised users can
access.

### Phase 5 --- Post editor and publishing

-   Build create/edit form.
-   Add draft and publish workflows.
-   Add preview.
-   Add slug validation.
-   Add image upload if selected.
-   Add delete confirmation and feedback.

**Deliverable:** End-to-end blog content management.

### Phase 6 --- Polish and launch

-   Implement SEO metadata and social previews.
-   Test accessibility and responsive layouts.
-   Test RLS and admin permissions.
-   Fix errors and optimise images.
-   Deploy.
-   Verify production routes and environment configuration.
-   Document how to maintain the website.

**Deliverable:** A deployed, tested, maintainable portfolio and blog.

------------------------------------------------------------------------

## 21. Rules for the AI Building This Project

Follow these instructions throughout implementation:

1.  **Read this entire specification before writing code.**
2.  Start by summarising the architecture, proposed stack, database
    design, and implementation phases.
3.  Identify genuinely missing information. Ask only for information
    needed to proceed; use clearly labelled placeholders for optional
    details.
4.  Do not invent work history, qualifications, testimonials, client
    results, project metrics, social handles, email addresses, or
    deployed URLs.
5.  Keep all personal copy editable and easy to update.
6.  Build one phase at a time and explain which files are being created
    or changed.
7.  After each phase, run the relevant checks and report what works,
    what remains, and any errors.
8.  Do not claim that a feature works unless it has been implemented and
    tested.
9.  Do not replace backend functionality with static sample data.
10. Never expose secrets or weaken authentication to make development
    easier.
11. Use current official documentation when framework or provider
    behaviour may have changed.
12. Prefer simple, understandable solutions over unnecessary
    abstractions.
13. Preserve existing working code when making changes. Inspect the
    project before replacing files.
14. If a tool or integration is unavailable, explain the limitation and
    provide the safest practical alternative.
15. Keep the design consistent across all public and admin pages.

### Suggested first response from the AI

Before coding, return:

-   A short understanding of the project.
-   The proposed stack and why it fits.
-   The proposed folder structure.
-   The database schema and access-control plan.
-   A list of information still needed from the owner.
-   The first implementation phase and its acceptance criteria.

Then wait for approval before making major architectural choices or
generating the full application.

------------------------------------------------------------------------

## 22. Owner-Supplied Details to Add Before Launch

Use placeholders until the owner confirms these details.

-   [ ] Preferred domain name.
-   [ ] Professional email address.
-   [ ] GitHub profile URL.
-   [ ] LinkedIn profile URL.
-   [ ] Instagram URL.
-   [ ] Threads URL.
-   [ ] X profile URL, if desired.
-   [ ] Profile photograph, if desired.
-   [ ] Final CV file, if a download is required.
-   [ ] Confirmed project descriptions and statuses.
-   [ ] Project screenshots and live/repository URLs.
-   [ ] Preferred accent colour, if different from the suggested
    direction.
-   [ ] Contact form delivery method.
-   [ ] First authorised admin email.
-   [ ] Privacy policy details if analytics, cookies, or visitor data
    collection are introduced.

Do not block the initial build on every item in this list. Use labelled
placeholders and make them easy to replace.

------------------------------------------------------------------------

## 23. Final Definition of Done

The project is complete when the owner has a deployed, responsive
portfolio that accurately represents their work and direction; a public
blog that reads published content from a database; and a secure admin
dashboard that allows the owner to create, edit, preview, publish,
unpublish, and delete posts.

The website must be maintainable by the owner, documented well enough to
run locally and deploy again, and built without fabricated personal
claims or non-functional interface elements.

**Build the simplest reliable version that meets these requirements.
Make it easy to improve over time.**
