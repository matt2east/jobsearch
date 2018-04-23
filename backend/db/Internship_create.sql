-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2018-04-10 17:05:58.662

-- tables
-- Table: APPLICATION
CREATE TABLE APPLICATION (
    APPLICATION_ID serial  NOT NULL,
    JOB_ID Integer  NOT NULL,
    RESUME_ID integer  NOT NULL,
    CONSTRAINT APPLICATION_pk PRIMARY KEY (APPLICATION_ID)
);

-- Table: EMPLOYERS
CREATE TABLE EMPLOYERS (
    EMPLOYER_ID serial  NOT NULL,
    Employer_Name varchar(100)  NOT NULL,
    Email varchar(100)  NOT NULL,
    City varchar(30)  NOT NULL,
    State varchar(30)  NOT NULL,
    Industry_SIC_Code varchar(30)  NULL,
    Business_Description varchar(4000)  NULL,
    CONSTRAINT EMPLOYER_ID PRIMARY KEY (EMPLOYER_ID)
);

-- Table: INDUSTRY
CREATE TABLE INDUSTRY (
    SIC_CODE varchar(4)  NOT NULL,
    Industry_Classification varchar(30)  NOT NULL,
    CONSTRAINT INDUSTRY_pk PRIMARY KEY (SIC_CODE)
);

-- Table: JOBS
CREATE TABLE JOBS (
    JOB_ID serial  NOT NULL,
    Job_Title varchar(30)  NOT NULL,
    Company_Name varchar(100)  NULL,
    City varchar(30)  NOT NULL,
    State varchar(30)  NOT NULL,
    Job_Summary varchar(4000)  NOT NULL,
    Responsibilities varchar(500)  NOT NULL,
    Qualifications varchar(500)  NOT NULL,
    Benefits varchar(30)  NULL,
    Type varchar(30)  NOT NULL,
    Annual_Salary integer  NULL,
    Hourly_Salary int  NULL,
    EMPLOYER_ID int  NOT NULL,
    RECRUITER_ID int  NULL,
    Hiring_Manager_First_Name varchar(100)  NULL,
    Hiring_Manager_Last_Name varchar(100)  NULL,
    CONSTRAINT JOBS_pk PRIMARY KEY (JOB_ID)
);

-- Table: RECRUITER
CREATE TABLE RECRUITER (
    RECRUITER_ID serial  NOT NULL,
    Email varchar(100)  NOT NULL,
    First_Name varchar(30)  NOT NULL,
    Last_Name varchar(30)  NOT NULL,
    Phone varchar(30)  NULL,
    Title varchar(30)  NULL,
    Recruiter_Company_Name varchar(100)  NOT NULL,
    CONSTRAINT RECRUITER_pk PRIMARY KEY (RECRUITER_ID)
);

-- Table: RESUMES
CREATE TABLE RESUMES (
    RESUME_ID serial  NOT NULL,
    File_Url varchar(500)  NULL,
    File_Type varchar(30)  NOT NULL,
    STUDENT_ID integer  NOT NULL,
    Date_added timestamp  NOT NULL DEFAULT current_timestamp,
    Active boolean  NOT NULL DEFAULT true,
    Tags_Json jsonb  NOT NULL,
    CONSTRAINT RESUMES_pk PRIMARY KEY (RESUME_ID)
);

-- Table: STATES
CREATE TABLE STATES (
    STATE_ABBREVIATION char(2)  NOT NULL,
    State_Name varchar(30)  NOT NULL,
    CONSTRAINT STATES_pk PRIMARY KEY (STATE_ABBREVIATION)
);

-- Table: STUDENTS
CREATE TABLE STUDENTS (
    STUDENT_ID serial  NOT NULL,
    First_Name varchar(30)  NOT NULL,
    Last_Name varchar(30)  NOT NULL,
    Email varchar(100)  NOT NULL,
    Phone varchar(30)  NULL,
    CONSTRAINT STUDENTS_pk PRIMARY KEY (STUDENT_ID)
);

-- foreign keys
-- Reference: APPLICATION_JOBS (table: APPLICATION)
ALTER TABLE APPLICATION ADD CONSTRAINT APPLICATION_JOBS
    FOREIGN KEY (JOB_ID)
    REFERENCES JOBS (JOB_ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: APPLICATION_RESUMES (table: APPLICATION)
ALTER TABLE APPLICATION ADD CONSTRAINT APPLICATION_RESUMES
    FOREIGN KEY (RESUME_ID)
    REFERENCES RESUMES (RESUME_ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: EMPLOYERS_INDUSTRY (table: EMPLOYERS)
ALTER TABLE EMPLOYERS ADD CONSTRAINT EMPLOYERS_INDUSTRY
    FOREIGN KEY (Industry_SIC_Code)
    REFERENCES INDUSTRY (SIC_CODE)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: EMPLOYERS_STATES (table: EMPLOYERS)
ALTER TABLE EMPLOYERS ADD CONSTRAINT EMPLOYERS_STATES
    FOREIGN KEY (State)
    REFERENCES STATES (STATE_ABBREVIATION)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: JOBS_AGENCY (table: JOBS)
ALTER TABLE JOBS ADD CONSTRAINT JOBS_AGENCY
    FOREIGN KEY (RECRUITER_ID)
    REFERENCES RECRUITER (RECRUITER_ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: JOBS_EMPLOYERS (table: JOBS)
ALTER TABLE JOBS ADD CONSTRAINT JOBS_EMPLOYERS
    FOREIGN KEY (EMPLOYER_ID)
    REFERENCES EMPLOYERS (EMPLOYER_ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: RESUMES_STUDENTS (table: RESUMES)
ALTER TABLE RESUMES ADD CONSTRAINT RESUMES_STUDENTS
    FOREIGN KEY (STUDENT_ID)
    REFERENCES STUDENTS (STUDENT_ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

INSERT into states values ('AL', 'Alabama'),
('AK', 'Alaska'),
('AZ', 'Arizona'),
('AR', 'Arkansas'),
('CA', 'California'),
('CO', 'Colorado'),
('CT', 'Connecticut'),
('DE', 'Delaware'),
('DC', 'District of Columbia'),
('FL', 'Florida'),
('GA', 'Georgia'),
('HI', 'Hawaii'),
('ID', 'Idaho'),
('IL', 'Illinois'),
('IN', 'Indiana'),
('IA', 'Iowa'),
('KS', 'Kansas'),
('KY', 'Kentucky'),
('LA', 'Louisiana'),
('ME', 'Maine'),
('MD', 'Maryland'),
('MA', 'Massachusetts'),
('MI', 'Michigan'),
('MN', 'Minnesota'),
('MS', 'Mississippi'),
('MO', 'Missouri'),
('MT', 'Montana'),
('NE', 'Nebraska'),
('NV', 'Nevada'),
('NH', 'New Hampshire'),
('NJ', 'New Jersey'),
('NM', 'New Mexico'),
('NY', 'New York'),
('NC', 'North Carolina'),
('ND', 'North Dakota'),
('OH', 'Ohio'),
('OK', 'Oklahoma'),
('OR', 'Oregon'),
('PA', 'Pennsylvania'),
('PR', 'Puerto Rico'),
('RI', 'Rhode Island'),
('SC', 'South Carolina'),
('SD', 'South Dakota'),
('TN', 'Tennessee'),
('TX', 'Texas'),
('UT', 'Utah'),
('VT', 'Vermont'),
('VA', 'Virginia'),
('WA', 'Washington'),
('WV', 'West Virginia'),
('WI', 'Wisconsin'),
('WY', 'Wyoming');

-- End of file.

