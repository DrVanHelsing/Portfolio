# Ongoing Project
## started: April 2025


# StudentLink - Complete Student Career Platform



A comprehensive AI-powered career readiness platform connecting students with job opportunities through intelligent CV analysis, personalized recommendations, and streamlined application workflows.A comprehensive AI-powered career readiness platform connecting students with job opportunities through intelligent CV analysis, personalized recommendations, and streamlined application workflows.



---



## 📋 Table of Contents## 📁 Project Structure## ?? Design Features



1. [System Overview](#system-overview)

2. [Architecture](#architecture)

3. [Technology Stack](#technology-stack)```### Theme Colors (Matching MAUI App)

4. [Project Structure](#project-structure)

5. [Getting Started](#getting-started)StudentLink/- **Primary**: `#512BD4` (Purple)

6. [Configuration](#configuration)

7. [Key Features](#key-features)├── StudentLinkFrontend/          # React web application- **Secondary**: `#DFD8F7` (Light Purple)

8. [Recommendation Engine](#recommendation-engine)

9. [Authentication & Security](#authentication--security)│   ├── src/                      # React source code- **Tertiary**: `#2B0B98` (Dark Purple)

10. [Deployment](#deployment)

11. [Testing](#testing)│   ├── public/                   # Static assets- **Accent Colors**: Gradients and complementary shades

12. [Troubleshooting](#troubleshooting)

│   ├── build/                    # Production build output

---

│   └── package.json              # NPM dependencies### UI Components

## System Overview

│- **Left Sidebar Navigation**: Modern collapsible sidebar with role-based menu items

StudentLink is a multi-platform career readiness solution consisting of three interconnected applications:

├── StudentLinkApi/               # ASP.NET Core Web API- **Responsive Cards**: Hover effects and smooth transitions

- **StudentLinkApi**: ASP.NET Core Web API (.NET 9) providing backend services

- **StudentLinkFrontend**: React web application for students, recruiters, and administrators│   ├── Controllers/              # API controllers- **Gradient Backgrounds**: Professional gradient overlays

- **StudentLinkApp**: .NET MAUI mobile application for students (iOS, Android, Windows)

│   ├── Models/                   # Data models- **Custom Scrollbars**: Themed scrollbars matching the color scheme

### Core Capabilities

│   ├── Services/                 # Business logic- **Animated Elements**: Fade-in, slide-up, and slide-in animations

- **AI-Powered CV Analysis**: Upload CVs for intelligent feedback, section-by-section improvements, and quality scoring

- **Personalized Job Recommendations**: ML-driven job matching using embeddings and feature engineering│   └── StudentLinkApi.csproj     # API project file

- **Job Management**: Recruiter tools for posting, managing, and tracking job applications

- **Interactive Feedback**: Actionable improvement suggestions with before/after examples│## ?? Project Structure

- **Progress Tracking**: Visual metrics showing CV improvement over time

- **Role-Based Access**: Student, Recruiter, and Admin roles with appropriate permissions├── StudentLinkApp/               # .NET MAUI Mobile App



---│   ├── Views/                    # XAML views```



## Architecture│   ├── ViewModels/              # View modelsstudentlink-frontend/



```│   ├── Services/                # App services??? public/

┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐

│                 │         │                  │         │                 ││   └── StudentLinkApp.csproj    # MAUI project file??? src/

│  React Frontend │◄───────►│  ASP.NET Core    │◄───────►│  Azure Services │

│  (Port 3000)    │  HTTPS  │  Web API         │  HTTPS  │  - OpenAI       ││?   ??? components/

│                 │         │  (Port 7068)     │         │  - Doc Intel    │

└─────────────────┘         └──────────────────┘         │  - SQL Server   │├── StudentLinkSharedLibrary/    # Shared models and utilities?   ?   ??? Layout.js              # Main layout wrapper

                                     ▲                    │  - Blob Storage │

                                     │                    └─────────────────┘│   ├── Models/                  # Shared data models?   ?   ??? Sidebar.js             # Left navigation sidebar

                                     │ HTTPS

                            ┌────────┴─────────┐│   └── StudentLinkSharedLibrary.csproj?   ?   ??? ProtectedRoute.js      # Auth route guard

                            │                  │

                            │  .NET MAUI App   ││?   ?   ??? ...

                            │  (Mobile/Desktop)│

                            │                  │└── StudentLinkSln.sln           # Visual Studio solution file?   ??? contexts/

                            └──────────────────┘

``````?   ?   ??? AuthContext.js         # Authentication context



### Data Flow?   ??? pages/



1. **Authentication**: User logs in via Frontend/MAUI → API validates credentials → Issues JWT token## 🚀 Getting Started?   ?   ??? LoginPage.js           # Login page

2. **CV Upload**: Student uploads CV → API stores file → Extracts text (OCR optional) → Sends to Azure OpenAI → Stores feedback

3. **Job Recommendations**: Student requests recommendations → API computes features → Scores jobs (ML model or embeddings) → Applies MMR diversification → Returns ranked list?   ?   ??? RegisterPage.js        # Registration page

4. **Job Application**: Student applies → API creates JobApplication → Updates analytics → Notifies recruiter

5. **Feedback Loop**: Student marks improvements complete → API recalculates progress → Updates metrics### Prerequisites?   ?   ??? DashboardPage.js       # Role-based dashboards



---- Visual Studio 2022 or later?   ?   ??? ProfilePage.js         # User profile management



## Technology Stack- .NET 8.0 SDK?   ?   ??? CVUploadPage.js        # CV upload with AI feedback



### Backend (StudentLinkApi)- Node.js 18+ (for frontend)?   ?   ??? RecommendationsPage.js # AI-powered job recommendations

- **Runtime**: .NET 9 / ASP.NET Core Web API

- **Database**: Entity Framework Core (SQL Server, LocalDB fallback)- SQL Server (for API)?   ?   ??? RolePages.js           # Jobs, applications, admin

- **Authentication**: JWT Bearer Tokens (extensible to Azure AD B2C)

- **AI Services**: ?   ?   ??? ...

  - Azure OpenAI (GPT-4o-mini for CV analysis, text-embedding-ada-002 for recommendations)

  - Azure Document Intelligence (optional OCR)### Building the Solution?   ??? services/

- **ML**: ML.NET (optional local model) with embeddings fallback

- **Storage**: Local filesystem (production: Azure Blob Storage)?   ?   ??? api.js                 # Axios API client



### Frontend (StudentLinkFrontend)1. **Open the Solution**?   ??? styles/

- **Framework**: React 18

- **Routing**: React Router DOM v6   ```powershell?   ?   ??? theme.js               # Theme configuration

- **HTTP Client**: Axios with interceptors

- **Styling**: Tailwind CSS with custom theme   # Open in Visual Studio?   ??? App.js                     # Main app component

- **State Management**: React Context API (AuthContext)

   .\StudentLinkSln.sln?   ??? index.css                  # Global styles

### Mobile (StudentLinkApp)

- **Framework**: .NET MAUI (Multi-platform App UI)   ```?   ??? index.js                   # Entry point

- **Platforms**: iOS, Android, Windows

- **Architecture**: MVVM pattern??? .env.local                     # Environment variables

- **Services**: Shared API client via `StudentLinkSharedLibrary`

2. **Restore Dependencies**??? package.json

---

   - Visual Studio will automatically restore NuGet packages??? tailwind.config.js             # Tailwind configuration

## Project Structure

   - For the frontend:??? README.md

```

StudentLink/     ```powershell```

├── README.md                          # This file

├── StudentLinkSln.sln                 # Visual Studio solution     cd StudentLinkFrontend

│

├── StudentLinkApi/                    # Backend API     npm install## ?? Getting Started

│   ├── Controllers/                   # API endpoints

│   │   ├── AuthController.cs          # Authentication     ```

│   │   ├── CVController.cs            # CV upload & management

│   │   ├── InteractiveFeedbackController.cs  # Section feedback### Prerequisites

│   │   ├── JobsController.cs          # Job CRUD & applications

│   │   ├── RecommendationsController.cs  # ML-powered matching3. **Build All Projects**- Node.js 16+ and npm

│   │   └── AdminController.cs         # User management

│   ├── Services/                      # Business logic   - In Visual Studio: Build → Build Solution (Ctrl+Shift+B)- StudentLink API running on `http://localhost:5036`

│   ├── Models/                        # Domain entities

│   ├── Data/                          # Database context & migrations   - Or use command line:

│   ├── wwwroot/cv/                    # Local CV storage

│   ├── appsettings.json               # Configuration     ```powershell### Installation

│   ├── Program.cs                     # Startup & DI

│   └── README.md                      # API documentation     dotnet build StudentLinkSln.sln

│

├── StudentLinkFrontend/               # React web app     ```1. **Install dependencies**:

│   ├── src/

│   │   ├── components/                # Reusable UI   ```bash

│   │   ├── contexts/                  # Auth context

│   │   ├── pages/                     # Route components### Running the Projects   cd studentlink-frontend

│   │   ├── services/                  # API clients

│   │   └── App.js                     # Root component   npm install

│   ├── .env.local                     # Environment variables

│   ├── package.json                   # Dependencies#### Frontend (React)   ```

│   └── README.md                      # Frontend documentation

│```powershell

├── StudentLinkApp/                    # .NET MAUI mobile app

│   ├── Views/                         # XAML UI pagescd StudentLinkFrontend2. **Configure environment**:

│   ├── ViewModels/                    # MVVM view models

│   ├── Services/                      # API & platform servicesnpm start   Create or update `.env.local`:

│   └── MauiProgram.cs                 # App startup

│```   ```

└── StudentLinkSharedLibrary/          # Shared code

    └── Models/                        # DTOs & shared modelsAccess at: http://localhost:3000   REACT_APP_API_BASE_URL=http://localhost:5036

```

   ```

---

#### API (ASP.NET Core)

## Getting Started

```powershell3. **Start development server**:

### Prerequisites

cd StudentLinkApi   ```bash

- **For Backend**:

  - [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)dotnet run   npm start

  - SQL Server / SQL Server Express / LocalDB

  - (Optional) Azure OpenAI API keys```   ```

  - (Optional) Azure Document Intelligence keys

Access at: https://localhost:7001   Open [http://localhost:3000](http://localhost:3000)

- **For Frontend**:

  - [Node.js 18+](https://nodejs.org/) and npm

  - Modern web browser

#### Mobile App (.NET MAUI)4. **Build for production**:

- **For MAUI App**:

  - Visual Studio 2022 (17.8+) with .NET MAUI workload- Open in Visual Studio   ```bash

  - Xcode (for iOS development on Mac)

  - Android SDK (for Android development)- Select your target platform (Android/iOS/Windows)   npm run build



### Quick Start (Local Development)- Press F5 to run   ```



#### 1. Clone Repository

```powershell

git clone <repository-url>## 📚 Documentation## ?? Authentication

cd StudentLink

```



#### 2. Configure API- **Frontend**: See `StudentLinkFrontend/README.md` for React app documentationThe app uses JWT-based authentication:

Create `StudentLinkApi/appsettings.Development.json`:

- **API**: See `StudentLinkApi/README.md` for API documentation- Tokens stored in `localStorage`

```json

{- **Mobile App**: See `StudentLinkApp/README.md` for MAUI app documentation- Auto-redirect on 401 (expired/invalid token)

  "ConnectionStrings": {

    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=StudentLink;Trusted_Connection=True;"- Protected routes with role-based access

  },

  "JwtSettings": {## 🔧 Development

    "SecretKey": "YourSecretKey_MustBe32CharsOrMore_ChangeInProduction",

    "Issuer": "StudentLink",### Default Test Users

    "Audience": "StudentLink",

    "ExpirationMinutes": 120Each project can be developed independently:```

  },

  "Azure": {- **Frontend developers**: Work in `StudentLinkFrontend/`Student:

    "OpenAI": {

      "Endpoint": "https://your-openai.openai.azure.com/",- **Backend developers**: Work in `StudentLinkApi/`  Email: student@test.com

      "ApiKey": "your-api-key-here",

      "DeploymentName": "gpt-4o-mini",- **Mobile developers**: Work in `StudentLinkApp/`  Password: Student123!

      "EmbeddingDeployment": "text-embedding-ada-002"

    },- **Shared code**: Modify `StudentLinkSharedLibrary/`

    "FormRecognizer": {

      "Endpoint": "https://your-docai.cognitiveservices.azure.com/",Recruiter:

      "ApiKey": "your-doc-intelligence-key",

      "Enabled": false## 📦 Deployment  Email: recruiter@test.com

    }

  },  Password: Recruiter123!

  "ML": {

    "UseLocalModel": false,- **Frontend**: Azure Static Web Apps or Azure App Service

    "ModelPath": "MLModels/job_match_model.zip"

  }- **API**: Azure App Service or Azure Container AppsAdmin:

}

```- **Mobile App**: App Store (iOS) / Google Play (Android) / Microsoft Store (Windows)  Email: admin@test.com



**Note**: Set `FormRecognizer.Enabled` to `false` if you don't have Document Intelligence keys.  Password: Admin123!



#### 3. Setup Database## 🤝 Contributing```

```powershell

cd StudentLinkApi

dotnet restore

dotnet ef database update1. Create a feature branch from `Dev`## ?? Pages Overview

```

2. Make your changes

If `dotnet-ef` is not installed:

```powershell3. Test thoroughly### Public Pages

dotnet tool install --global dotnet-ef

```4. Submit a pull request- **Login** (`/login`): Sign in with email and password



#### 4. Run API- **Register** (`/register`): Create a new account (Student/Recruiter)

```powershell

# Development mode with hot reload## 📄 License- **Home** (`/`): Landing page with call-to-action

dotnet watch run



# OR standard run

dotnet runCopyright © 2025 StudentLink. All rights reserved.### Protected Pages

```



API will start at:#### Student Role

- **HTTPS**: `https://localhost:7068`- **Dashboard** (`/dashboard`): Stats, quick actions, recent activity

- **HTTP**: `http://localhost:5068`- **Browse Jobs** (`/jobs`): Search and filter job listings

- **Swagger** (if enabled): `https://localhost:7068/swagger`- **Recommendations** (`/recommendations`): AI-matched jobs based on CV

- **My CV** (`/cv-upload`): Upload CV with drag-and-drop

#### 5. Run Frontend- **Applications** (`/applications`): Track application status

Open a new terminal:- **Profile** (`/profile`): Manage account information



```powershell#### Recruiter Role

cd StudentLinkFrontend- **Dashboard** (`/dashboard`): Job stats and management overview

npm install- **Recruiter Jobs** (`/recruiter/jobs`): Create and manage job postings

npm start- **Student Directory** (`/directory/students`): Browse candidate profiles

```- **Profile** (`/profile`): Manage account information



Frontend will open at: `http://localhost:3000`#### Admin Role

- **Dashboard** (`/dashboard`): System overview and stats

#### 6. Login with Sample Account- **Manage Users** (`/admin/users`): User management

- **Admin Directory** (`/admin/directory`): Full directory access

**Student**:- **All Student/Recruiter Features**: Full system access

- Email: `student@test.com`

- Password: `Student123!`## ?? Styling Guide



**Recruiter**:### Custom CSS Classes

- Email: `recruiter@test.com`

- Password: `Recruiter123!````css

/* Gradients */

**Admin**:.gradient-primary       /* Purple gradient background */

- Email: `admin@test.com`.gradient-secondary     /* Light purple gradient */

- Password: `Admin123!`.text-gradient          /* Gradient text effect */



---/* Components */

.card                   /* White card with shadow */

## Configuration.btn-primary            /* Primary gradient button */

.btn-secondary          /* Secondary button */

### API Configuration.input-field            /* Styled input field */



#### Connection Strings/* Badges */

```json.badge                  /* Base badge */

"ConnectionStrings": {.badge-primary          /* Purple badge */

  "DefaultConnection": "Server=...;Database=StudentLink;...".badge-secondary        /* Light purple badge */

}.badge-success          /* Green badge */

```.badge-error            /* Red badge */



#### JWT Settings/* Animations */

```json.animate-fade-in        /* Fade in animation */

"JwtSettings": {.animate-slide-in       /* Slide in from left */

  "SecretKey": "Must be at least 32 characters long",.animate-slide-up       /* Slide up animation */

  "Issuer": "StudentLink",```

  "Audience": "StudentLink",

  "ExpirationMinutes": 120### Tailwind Colors

}

``````javascript

// tailwind.config.js

**Production**: Store `SecretKey` in Azure Key Vault or environment variable.colors: {

  primary: {

#### Azure OpenAI    DEFAULT: '#512BD4',

```json    dark: '#ac99ea',

"Azure": {    darker: '#2B0B98',

  "OpenAI": {    darkest: '#190649',

    "Endpoint": "https://your-resource.openai.azure.com/",  },

    "ApiKey": "your-key",  secondary: {

    "DeploymentName": "gpt-4o-mini",    DEFAULT: '#DFD8F7',

    "EmbeddingDeployment": "text-embedding-ada-002"  },

  }}

}```

```

## ?? API Integration

Used for CV analysis and job recommendation embeddings.

All API calls go through the centralized `api.js` client:

#### Document Intelligence (Optional)

```json```javascript

"Azure": {import api from '../services/api';

  "FormRecognizer": {

    "Endpoint": "https://your-docai.cognitiveservices.azure.com/",// Automatic JWT token attachment

    "ApiKey": "your-key",// Automatic 401 handling and redirect

    "Enabled": true// Base URL from environment variable

  }

}// Example usage:

```const response = await api.get('/jobs/search');

const data = await api.post('/auth/login', { email, password });

Set `Enabled: false` to use simple text extraction.```



### Frontend Configuration## ?? Responsive Design



Create `StudentLinkFrontend/.env.local`:- **Mobile**: Single column layout, hamburger menu

- **Tablet**: Two column grids, condensed sidebar

```env- **Desktop**: Full sidebar, multi-column grids

REACT_APP_API_BASE_URL=http://localhost:5036- **Large Desktop**: Maximum width containers, optimized spacing

```

## ?? Future Enhancements

**Production**:

```env- [ ] Real-time notifications

REACT_APP_API_BASE_URL=https://your-api.azurewebsites.net- [ ] Chat messaging system

```- [ ] Advanced search filters

- [ ] Interview scheduling

---- [ ] Video uploads

- [ ] Dark mode toggle

## Key Features- [ ] Progressive Web App (PWA)



### 1. Intelligent CV Analysis## ?? Known Issues



**Flow**:- Minor ESLint warnings (non-breaking)

1. Student uploads PDF/DOC/DOCX (≤5MB)- CV feedback page needs full implementation

2. System extracts text (OCR if enabled, else plain text)- Student directory pagination

3. Azure OpenAI analyzes:- Real-time status updates

   - Overall quality score (0-1)

   - Section scores: Contact, Summary, Experience, Education, Skills## ?? Development Notes

   - Prioritized improvement actions with examples

   - Comparison with previous uploads### Code Style

4. Student views interactive feedback- Functional components with hooks

5. Student marks actions complete- Async/await for API calls

6. Progress metrics updated- Consistent error handling

- Accessibility considerations

**API Endpoints**:

- `POST /cv/upload` - Upload CV### Performance

- `GET /cv/interactive/{cvId}/feedback` - Get detailed feedback- Lazy loading for routes (future)

- `POST /cv/interactive/{cvId}/action/{index}/complete` - Mark action done- Optimized images

- `GET /cv/interactive/progress` - View improvement metrics- Minimized bundle size

- Efficient re-renders with useCallback/useMemo

### 2. Job Recommendations (ML-Powered)

## ?? Support

**Feature Engineering**: Extract 40+ features per (student, job) pair

- Skills match (exact, Jaccard, semantic similarity)For issues or questions:

- Experience alignment (years, embedding similarity)- Check API logs: `dotnet run` in StudentLinkApi

- Education match, location compatibility, salary fit- Check browser console for errors

- Student quality (CV score, profile completeness)- Verify API is running on correct port

- Job priors (recency, popularity)- Clear localStorage if auth issues persist

- Historical interactions

## ?? License

**Scoring**:

- **Default**: Weighted linear combination emphasizing skills, experience, recencyPart of the StudentLink project - Future Innovators

- **Optional**: ML.NET trained classifier

---

**Diversification**: MMR (Maximal Marginal Relevance) reduces near-duplicate jobs

**Happy Coding! ??**

**API Endpoints**:
- `GET /api/Recommendations/{userId}?topK=10` - Get personalized recommendations
- `POST /api/Recommendations/track-view` - Log job view
- `POST /api/Recommendations/track-apply` - Log application
- `POST /api/Recommendations/track-dismiss` - Dismiss job

### 3. Job Management (Recruiters)

- Create job postings with rich details
- View applications with student CV access
- Update application status
- Search and filter own jobs

**API Endpoints**:
- `POST /jobs` - Create job
- `GET /jobs/mine` - Get recruiter's jobs
- `PUT /jobs/{id}` - Update job
- `DELETE /jobs/{id}` - Delete job
- `GET /jobs/{id}/applications` - View applicants

### 4. Admin Dashboard

- User management (activate/deactivate, change roles)
- Platform statistics
- Student directory with CV quality scores
- Import jobs from CSV or LinkedIn sample data

---

## Recommendation Engine

### Architecture

The recommendation engine combines traditional ML features with embedding-based similarity.

**Pipeline**:
1. **Feature Engineering**: Extract 40+ features per (student, job) pair
2. **Scoring**: ML model or weighted linear combination
3. **Filtering**: Remove dismissed/applied jobs
4. **Diversification**: MMR to reduce near-duplicates
5. **Explanation**: Generate human-readable match reasons
6. **Analytics**: Log recommendations with ranks & scores

### Feature Engineering

**StudentJobFeatures** (40+ dimensions):

| Category | Features |
|----------|----------|
| **Skills Match** | Exact matches, Jaccard similarity, semantic similarity |
| **Experience** | Years gap, embedding similarity |
| **Education** | Level match |
| **Location** | Match score |
| **Salary** | Compatibility |
| **Student Quality** | CV score, profile completeness, skills count |
| **Job Quality** | Recency, popularity |
| **Interactions** | Application count, interview rate |
| **Categorical** | Job type, remote policy (one-hot) |

### Scoring Models

#### Default: Embeddings-Based

```
score = 0.50 * skills_similarity 
      + 0.15 * experience_similarity 
      + 0.12 * recency_score 
      + 0.12 * popularity_score 
      + 0.04 * education_match 
      + 0.04 * location_match 
      + 0.02 * salary_compatibility 
      + 0.01 * cv_quality_score
```

**Boosts**: Fresh jobs (+5%), popular jobs (+5%), exact skill matches (+10-15%)

**Penalties**: Under-qualified (-25%)

#### Optional: ML.NET Model

Train a classifier on historical application data. Enable by setting `ML:UseLocalModel = true`.

### Diversification (MMR)

Reduces similar jobs using embeddings:
1. Select highest scored job
2. For remaining jobs, penalize by similarity to selected jobs
3. Repeat until `topK` jobs selected

### Explanation Generation

Each recommendation includes `matchReason` describing key factors:

```json
{
  "matchScore": 0.87,
  "matchReason": "Strong skills match (8/10 required). Experience aligns well (3 years vs. 2-4 required). Recently posted (2 days ago)."
}
```

---

## Authentication & Security

### Authentication Flow

1. User logs in → API validates credentials → Issues JWT with claims
2. Client stores token (localStorage web, secure storage MAUI)
3. Protected requests include `Authorization: Bearer <token>` header
4. API validates signature and expiry
5. Role checks enforce permissions

### JWT Configuration

- **Algorithm**: HS256 (symmetric key)
- **Key**: `JwtSettings:SecretKey` (min 32 chars)
- **Claims**: `sub` (userId), `email`, `role`, `exp`, `iss`, `aud`

### Role-Based Access

| Role | Permissions |
|------|-------------|
| **Student** | Upload CV, view feedback, browse jobs, apply, get recommendations |
| **Recruiter** | Create/manage jobs, view applicants, update application status |
| **Admin** | All permissions plus user management, platform stats |

### Security Best Practices

**Development**:
- Use strong JWT secret (32+ chars)
- HTTPS enforced
- CORS configured for frontend origin

**Production**:
- Store secrets in Azure Key Vault
- Rotate JWT secret periodically
- Implement refresh tokens
- Rate limiting on auth endpoints
- File upload validation (size, type, malware scan)

---

## Deployment

### Azure Deployment

#### Required Resources

| Resource | Purpose |
|----------|---------|
| Azure SQL Database | Persistent storage |
| App Service | Host API |
| Static Web App | Host frontend |
| Storage Account | CV file storage |
| Azure OpenAI | AI analysis |
| Key Vault | Secret management |
| Application Insights | Telemetry |

#### Quick Deploy (Azure CLI)

```bash
# Create resource group
az group create -n rg-studentlink-prod -l eastus

# Create SQL Server & Database
az sql server create -g rg-studentlink-prod -n studentlink-sqlserver -l eastus -u sqladmin -p <password>
az sql db create -g rg-studentlink-prod -s studentlink-sqlserver -n studentlinkdb --service-objective S0

# Create App Service
az appservice plan create -g rg-studentlink-prod -n asp-studentlink-prod --sku B1 --is-linux
az webapp create -g rg-studentlink-prod -p asp-studentlink-prod -n studentlink-api --runtime "DOTNET:9.0"

# Deploy API
cd StudentLinkApi
dotnet publish -c Release -o publish
Compress-Archive -Path publish\* -DestinationPath publish.zip
az webapp deployment source config-zip -g rg-studentlink-prod -n studentlink-api --src publish.zip
```

For detailed deployment instructions, see `StudentLinkApi/README.md`.

---

## Testing

### API Testing

**Manual with cURL**:

```bash
# Login
curl -X POST https://localhost:7068/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"Student123!"}'

# Upload CV
curl -X POST https://localhost:7068/cv/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@Resume.pdf"

# Get Recommendations
curl -H "Authorization: Bearer $TOKEN" \
  "https://localhost:7068/api/Recommendations/$USER_ID?topK=10"
```

**Swagger UI**: Navigate to `https://localhost:7068/swagger`

### Frontend Testing

```powershell
cd StudentLinkFrontend
npm start     # Development server
npm run build # Production build
npx serve -s build  # Serve build
```

### End-to-End Scenarios

1. **Student Journey**: Register → Upload CV → View feedback → Apply to jobs
2. **Recruiter Journey**: Login → Create job → View applicants → Update status
3. **Admin Journey**: Login → View stats → Change user roles → Import jobs

---

## Troubleshooting

### API doesn't start

- **Database connection failed**: Check SQL Server is running, verify connection string, run migrations
- **JWT secret error**: Ensure `SecretKey` ≥32 characters

### Frontend can't reach API

- **CORS error**: Verify API CORS policy includes frontend origin
- **Wrong port**: Check `REACT_APP_API_BASE_URL` matches API port

### Recommendations return empty

- No jobs in database → Import sample: `POST /admin/jobs/import-linkedin20`
- Student has no CV → Upload CV first
- All jobs dismissed → Check `JobMatch` table

### CV Upload fails

- **File too large**: Max 5MB
- **Unsupported type**: Use PDF, DOC, or DOCX only
- **Processing hangs**: Check Azure OpenAI logs, verify API keys

### 401 Unauthorized

- Token expired → Re-login
- Invalid token → Check JWT secret matches
- Decode token at [jwt.io](https://jwt.io) to verify claims

### Logs & Debugging

**API Logs** (Development): Console output shows EF queries, HTTP requests, errors

**API Logs** (Production): Azure Portal → App Service → Log Stream

**Frontend Logs**: Browser Developer Tools → Console and Network tabs

---

## License

Copyright © 2025 StudentLink. All rights reserved.

---

## Support

For issues or questions:
- Review this documentation
- Check API logs
- Verify configuration settings
- See `StudentLinkApi/README.md` for detailed API documentation

**Happy Building! 🚀**
