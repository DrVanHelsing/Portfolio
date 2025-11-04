# 🌱 FinanceBuddy - AI-Powered Financial Wellness

## started & completed: September 2025
### Postion Awarded in AI Category for the South African Intervarsity Hackathon was Third Place

[![.NET MAUI](https://img.shields.io/badge/.NET%20MAUI-9.0-blue)](https://dotnet.microsoft.com/apps/maui)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-8.0-green)](https://dotnet.microsoft.com/apps/aspnet)
[![Azure OpenAI](https://img.shields.io/badge/Azure%20OpenAI-GPT--4-orange)](https://azure.microsoft.com/products/cognitive-services/openai-service)
[![Hackathon](https://img.shields.io/badge/SA%20Intervarsity%20Hack-2025-red)](https://github.com/DrVanHelsing/SAIntervarsityHack2025-MoneyMentor)

**Your AI-powered companion for financial wellness that grows with your money-wise journey! 🌸**

FinanceBuddy combines intelligent expense tracking, personalized AI financial advice, and engaging plant gamification to help you develop healthy financial habits that last a lifetime.

## 📱 What Makes FinanceBuddy Special?

### 🤖 **AI Money Mentor**
- **Personalized Financial Advice** powered by Azure OpenAI
- **Natural Language Chat** for all your money questions
- **Voice Input Support** for hands-free interaction
- **Multi-language Support** with Azure Translator

### 🌱 **Plant Gamification System**
Your financial wellness journey is represented by a beautiful plant that grows through 6 stages:
- 🌰 **Seed** (0-99 pts) - Starting your financial journey
- 🌱 **Sprout** (100-299 pts) - Money aware and learning  
- 🌿 **Seedling** (300-599 pts) - Building good habits
- 🪴 **Young Plant** (600-999 pts) - Developing financial discipline
- 🌳 **Mature Plant** (1000-1499 pts) - Money-wise mastery
- 🌸 **Blooming Tree** (1500+ pts) - Financially flourishing!

### 💸 **Smart Expense Tracking**
- **Voice-to-Text** expense entry
- **Automatic Categorization** with visual analytics
- **Real-time Gamification** points and feedback
- **Cross-platform Sync** between devices

### 🎯 **Comprehensive Point System**
Earn points for diverse financial wellness activities:
- Daily expense logging and streak bonuses
- Setting and achieving savings goals
- Learning through AI mentor interactions
- Completing weekly financial reviews
- Budget creation and compliance

## 🚀 Quick Start

### For Users
1. **Download**: Get FinanceBuddy from your app store (when released)
2. **Setup**: Grant microphone permissions for voice features
3. **Start Growing**: Log your first expense and watch your plant begin to grow!
4. **Learn**: Ask the AI Money Mentor questions about budgeting and savings
5. **Achieve**: Set goals and watch your financial wellness flourish

### For Developers
1. **Clone the repository**
   ```bash
   git clone https://github.com/DrVanHelsing/SAIntervarsityHack2025-MoneyMentor.git
   cd SAIntervarsityHack2025-MoneyMentor
   ```

2. **Follow the setup guide**
   ```bash
   # See detailed instructions
   docs/SETUP.md
   ```

3. **Run the application**
   ```bash
   # Start API server
   cd MoneyMentor.ApiOrchestrator
   dotnet run
   
   # Start MAUI app (separate terminal)
   cd FinanceBuddy
   dotnet build -t:Run -f net9.0-android
   ```

## 📚 Comprehensive Documentation

We've created detailed documentation for all aspects of the project:

| Document | Description |
|----------|-------------|
| [📖 **USAGE.md**](docs/USAGE.md) | Complete user guide with features and tips |
| [⚙️ **SETUP.md**](docs/SETUP.md) | Detailed installation and configuration guide |
| [👥 **TEAM.md**](docs/TEAM.md) | Team member information and contact details |
| [🙏 **ACKNOWLEDGEMENTS.md**](docs/ACKNOWLEDGEMENTS.md) | Third-party libraries and attributions |
| [☁️ **Azure Infrastructure**](scripts/README-main-bicep.md) | Azure deployment guide with Bicep |

## 🏗️ Architecture

### Technology Stack
- **Frontend**: .NET MAUI 9.0 (Cross-platform: Android, iOS, Windows, macOS)
- **Backend**: ASP.NET Core 8.0 Web API
- **Database**: Entity Framework Core with SQL Server
- **AI Services**: Azure OpenAI (GPT-4), Azure Speech, Azure Translator
- **Cloud**: Microsoft Azure infrastructure

### Project Structure
```
├── FinanceBuddy/                 # .NET MAUI Cross-platform App
│   ├── Components/               # Reusable UI components (PlantStatusView)
│   ├── Pages/                    # App pages (Chat, Expenses, Plant Care)
│   ├── Services/                 # Business logic and API integration
│   └── Resources/                # Images, fonts, styles
├── MoneyMentor.ApiOrchestrator/  # ASP.NET Core Web API
│   ├── Controllers/              # API endpoints
│   ├── Services/                 # Business services (AI, Translation)
│   └── Data/                     # Entity Framework DbContext
├── MoneyMentor.Shared/           # Shared models and DTOs
├── docs/                         # Comprehensive documentation
└── scripts/                      # Azure infrastructure (Bicep)
```

## 🎓 Hackathon Context

**Competition**: SA Intervarsity Hack 2025 - MoneyMentor Challenge  
**University**: University of the Western Cape  
**Team**: Tredir Sewpaul & Mzameli Mashiyi  
**Goal**: Create innovative AI-powered financial wellness solution

### Key Innovations
✨ **Holistic Financial Wellness**: Beyond expense tracking to complete financial education  
✨ **AI-Powered Guidance**: Personalized advice using Azure OpenAI  
✨ **Engaging Gamification**: Plant growth represents real financial progress  
✨ **Cross-Platform Solution**: True write-once, run-everywhere with .NET MAUI  
✨ **Accessibility**: Voice input and inclusive design principles  

## 🌟 Features Showcase

### 💬 AI Money Mentor Chat
Ask questions like:
- "How should I create my first budget?"
- "What's the best way to start an emergency fund?"
- "Help me reduce my grocery expenses"

### 🎮 Interactive Plant Care
- **Tap your plant** to see detailed growth statistics
- **Track progress** with visual wellness scores
- **Celebrate milestones** with level-up animations
- **Test features** in the Plant Care exploration tab

### 📊 Smart Analytics
- **Expense categorization** with visual charts
- **Spending pattern analysis** and insights
- **Budget compliance tracking** with gamification
- **Financial wellness scoring** across multiple dimensions

## 🔧 Development & Testing

### Core Features for Testing
1. **Expense Logging**: Add expenses and earn points
2. **AI Chat**: Ask Money Mentor financial questions
3. **Plant Growth**: Watch your plant evolve through stages
4. **Voice Input**: Use speech-to-text for expense entry
5. **Goal Setting**: Create and achieve financial goals

### Testing Environment
Use the **Plant Care** tab for comprehensive feature testing:
- Award points manually to test plant growth
- Simulate different financial activities
- Reset gamification profile for clean testing
- Explore all point-earning mechanisms

### Configuration Requirements
- **Azure OpenAI**: API key and endpoint configuration
- **Database**: SQL Server or in-memory for development
- **Speech Services**: Optional for voice features
- **Translation**: Multi-language support configuration

---

## 🎯 Getting Started Guides

### For End Users
👉 **[Complete Usage Guide](docs/USAGE.md)** - Learn how to use every feature

### For Developers
👉 **[Development Setup](docs/SETUP.md)** - Complete installation and configuration guide

### For Deployment
👉 **[Azure Infrastructure](scripts/README-main-bicep.md)** - Deploy to Azure cloud

---

## 🤝 Contributing

We welcome contributions to FinanceBuddy! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`feature/amazing-feature`)
3. **Follow** our development guidelines in [SETUP.md](docs/SETUP.md)
4. **Test** your changes thoroughly
5. **Submit** a pull request with clear description

### Development Guidelines
- Use **.NET coding conventions**
- **Test** on multiple platforms when possible
- **Document** new features and changes
- **Follow** the existing architecture patterns

## 📞 Support & Contact

### Team Members
- **Tredir Sewpaul** - Team Lead & Full-Stack Developer
  - 📧 5100592@mypillar7uwc.ac.za
  - 📱 067 408 2819
  - 💬 Discord: tredirs

- **Mzameli Mashiyi** - Full-Stack Developer, Aspiring Machine Learning Engineer & Co-Lead
  - 📱 079 825 0366
  - 💬 Discord: mayarha_27989

### Getting Help
- 🐛 **Bug Reports**: [Create an issue](https://github.com/DrVanHelsing/SAIntervarsityHack2025-MoneyMentor/issues)
- 💡 **Feature Requests**: [Suggest improvements](https://github.com/DrVanHelsing/SAIntervarsityHack2025-MoneyMentor/discussions)
- 📖 **Documentation**: Check our [comprehensive docs](docs/)

## 🏆 Achievements

### Technical Accomplishments
- ✅ **Complete Cross-Platform App** with .NET MAUI 9.0
- ✅ **AI Integration** with Azure OpenAI and Speech Services
- ✅ **Comprehensive Gamification** system with 6 plant growth stages
- ✅ **Real-time Chat** with personalized financial advice
- ✅ **Cloud-Ready Infrastructure** with Azure Bicep templates
- ✅ **Accessibility Features** including voice input support

### Hackathon Goals Achieved
- ✅ **Innovation**: Unique plant-based gamification approach
- ✅ **AI Integration**: Seamless Azure OpenAI financial mentoring
- ✅ **User Experience**: Engaging and educational financial wellness
- ✅ **Technical Excellence**: Production-ready architecture and deployment
- ✅ **Accessibility**: Inclusive design with voice and visual features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Special thanks to:
- **SA Intervarsity Hack 2025 Organizers** for this incredible opportunity
- **University of the Western Cape** for academic support
- **Microsoft Azure** for providing accessible AI services
- **.NET MAUI Community** for extensive documentation and support
- **Open Source Contributors** whose libraries made this project possible

---

<div align="center">

**🌱 Grow Your Financial Wellness with FinanceBuddy! 🌸**

*From financial awareness to money-wise mastery - let your plant represent your journey to financial flourishing!*

---

**Made with 💚 by University of the Western Cape students for SA Intervarsity Hack 2025**

[⭐ Star this repo](https://github.com/DrVanHelsing/SAIntervarsityHack2025-MoneyMentor) | [📖 Read the docs](docs/) | [🚀 Get started](docs/SETUP.md)

</div>

---

## 🔧 Technical Details & Development Notes

### Azure OpenAI Configuration
```json
{
  "AzureOpenAI": {
    "Endpoint": "https://your-resource.openai.azure.com/",
    "ApiKey": "your-api-key",
    "DeploymentName": "gpt-4o"
  }
}
```

### Speech Features (Optional)
Speech recognition for expense entry can be enabled/disabled based on:
```csharp
if (config.GetValue<bool>("Features:EnableDeviceSpeech"))
    builder.Services.AddSingleton<ISpeechService, PlatformSpeechService>();
else
    builder.Services.AddSingleton<ISpeechService, NoOpSpeechService>();
```

### Database Configuration
- **Development**: In-memory Entity Framework for quick testing
- **Production**: SQL Server with Entity Framework Core migrations
- **Connection**: Configured through appsettings.json or environment variables

### Cross-Platform Support
- **Android**: API level 21+ (Android 5.0+)
- **iOS**: Version 15.0+
- **Windows**: Windows 10 version 1903+
- **macOS**: macOS 12.0+ (via Mac Catalyst)

### Testing & CI Recommendations
- **Unit Tests**: AdviceService prompt building and fallback behavior
- **Integration Tests**: ExpensesController with in-memory provider
- **Mock Services**: TranslationService with HttpMessageHandler mocking
- **Platform Testing**: Cross-platform deployment validation

### Troubleshooting Common Issues
- **"Azure OpenAI not configured"**: Check environment variables and appsettings
- **Speech recognition not working**: Verify microphone permissions and feature flags
- **Plant not updating**: Use refresh functionality in Plant Care tab
- **API connection issues**: Ensure API server is running and accessible

### Extension Points for Future Development
- **Multi-user Authentication**: Add user-specific data isolation
- **Conversation Persistence**: Multi-turn context for AI conversations
- **Offline Capability**: SQLite caching with sync functionality
- **Social Features**: Share achievements and plant gardens
- **Advanced Analytics**: Detailed financial wellness insights

### Performance Optimization
- **Hot Reload**: Enabled for MAUI development
- **Lazy Loading**: Component initialization and data loading
- **Caching**: Local storage for gamification data
- **Efficient Queries**: Entity Framework query optimization

---

*This README serves as the central hub for FinanceBuddy documentation. For detailed information on any topic, please refer to the comprehensive guides in the [docs](docs/) folder.*

