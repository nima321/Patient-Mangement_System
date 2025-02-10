USE [master]
GO
/****** Object:  Database [PatientDB]    Script Date: 2/10/2025 3:46:47 PM ******/
CREATE DATABASE [PatientDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PatientDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\PatientDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'PatientDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\PatientDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [PatientDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PatientDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PatientDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PatientDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PatientDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PatientDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PatientDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [PatientDB] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [PatientDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PatientDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PatientDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PatientDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PatientDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PatientDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PatientDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PatientDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PatientDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [PatientDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PatientDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PatientDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PatientDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PatientDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PatientDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PatientDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PatientDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [PatientDB] SET  MULTI_USER 
GO
ALTER DATABASE [PatientDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PatientDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PatientDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PatientDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PatientDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PatientDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [PatientDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [PatientDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [PatientDB]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 2/10/2025 3:47:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Patients]    Script Date: 2/10/2025 3:47:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Patients](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[DateOfBirth] [datetime2](7) NOT NULL,
	[Gender] [nvarchar](max) NOT NULL,
	[ContactNumber] [nvarchar](max) NOT NULL,
	[Address] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Patients] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2/10/2025 3:47:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](max) NOT NULL,
	[PasswordHash] [nvarchar](max) NOT NULL,
	[Role] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20250207104111_InitialCreate', N'9.0.1')
GO
SET IDENTITY_INSERT [dbo].[Patients] ON 

INSERT [dbo].[Patients] ([Id], [Name], [DateOfBirth], [Gender], [ContactNumber], [Address]) VALUES (3, N'Sajjan Raj Vaidya', CAST(N'2011-03-02T00:00:00.0000000' AS DateTime2), N'Male', N'9823002300', N'kathmandu neapl')
SET IDENTITY_INSERT [dbo].[Patients] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Username], [PasswordHash], [Role]) VALUES (1, N'Nima', N'$2a$11$rasj8CbkBGkXh1t2qZdc0.DatRA8U4iH1MUsaNGS/BSGlyvDZmj4y', N'User')
INSERT [dbo].[Users] ([Id], [Username], [PasswordHash], [Role]) VALUES (2, N'admin', N'$2a$11$IkvjrKOD5kNTPX4o4DTZrO5v5PvpGqrjPZZbbxXtVAcv5fAaBgLo6', N'Admin')
INSERT [dbo].[Users] ([Id], [Username], [PasswordHash], [Role]) VALUES (3, N'dawa', N'$2a$11$dTfbgaw0ySazjoo41csNM.inTLSnCHxzymJYI27E6PhB/us/K0jXq', N'User')
INSERT [dbo].[Users] ([Id], [Username], [PasswordHash], [Role]) VALUES (4, N'nimu', N'$2a$11$SjSaHy3tfU9QwxDcqmtTwupoGKukyXX3xfYGokjKVmjf0c8V2I7x6', N'User')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
USE [master]
GO
ALTER DATABASE [PatientDB] SET  READ_WRITE 
GO
