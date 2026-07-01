// THE NURSING EXAM JOURNAL — Official Syllabus
// MUHS / INC Revised B.Sc Nursing curriculum (Gazette of India).
// Source: official course-outline PDFs for OBG Nursing - I (VI Sem) & II (VII Sem).
// Faithful reproduction of the printed course outline — theory units, competencies,
// skill-lab procedures and clinical postings. Exposed as window.SYLLABUS_DATA.

window.SYLLABUS_DATA = {
  references: [
    "DUTTA — Textbook of Obstetrics (4th ed.); Textbook of Gynaecology (3rd ed.)",
    "C.S. DAWN — Textbook of Gynaecology, Contraception and Demography (13th ed.)",
    "BOBAK & JENSEN — Essentials of Maternity Nursing (3rd ed.)",
    "LONGMAN — Clinical Obstetrics (9th ed.)",
    "CAMPBELL — Gynaecology by Ten Teachers (17th ed.)",
    "MYLES — Textbook for Midwives (14th ed.)"
  ],

  courses: [
    /* ════════════════════════════════════════════════════════════════
       OBG NURSING - I  (VI SEMESTER)
       ════════════════════════════════════════════════════════════════ */
    {
      id: "obg1",
      course: "OBG-I",
      fullTitle: "Midwifery / Obstetrics and Gynaecology (OBG) Nursing - I",
      subtitle: "including SBA module",
      placement: "VI Semester",
      theory: "3 Credits (60 hours)",
      practicum: "Skill Lab: 1 Credit (40 hrs) · Clinical: 3 Credits (240 hrs)",
      description:
        "Designed to develop knowledge and competencies on the concepts and principles of midwifery — rendering respectful maternity care to women during antenatal, intranatal and postnatal periods, managing normal neonates, and participating in family welfare programs.",
      competencies: [
        "Demonstrate professional accountability for nursing care as per INC standards / ICM competencies, consistent with moral, altruistic, legal, ethical, regulatory and humanistic principles of midwifery practice.",
        "Communicate effectively with individuals, families and professional colleagues, fostering mutual respect and shared decision making.",
        "Recognize the trends and issues in midwifery and obstetrical nursing.",
        "Review and describe the anatomy and physiology of human reproductive system and conception.",
        "Describe and apply physiology in the management of normal pregnancy, birth and puerperium.",
        "Demonstrate competency in providing respectful and evidence based maternity care during the antenatal, intranatal and postnatal period.",
        "Uphold the fundamental human rights of individuals when providing midwifery care.",
        "Promote physiologic labour and birth, and conduct normal childbirth.",
        "Provide evidence based essential newborn care.",
        "Apply the nursing process approach in caring for women and their families.",
        "Describe the methods of contraception and role of nurse / midwife in family welfare services.",
        "Recognize the importance of and actively participate in family welfare programs.",
        "Provide youth friendly health services and care for women affected by gender based violence."
      ],
      units: [
        {
          roman: "I",
          title: "Introduction to Midwifery",
          hours: { t: 8, l: 0, c: 0 },
          outcomes: [
            "Explain the history and current scenario of midwifery in India.",
            "Review vital health indicators.",
            "Describe the various national health programs related to RMNCH+A.",
            "Identify the trends and issues in midwifery.",
            "Discuss the legal and ethical issues relevant to midwifery practice."
          ],
          topics: [
            { heading: "Introduction to midwifery", items: ["History of midwifery in India"] },
            {
              heading: "Current scenario",
              items: [
                "Trends of maternity care in India",
                "Midwifery in India — transformative education for relationship-based and transformative midwifery practice in India"
              ]
            },
            {
              heading: "Vital health indicators",
              items: [
                "Maternal Mortality Ratio, Infant Mortality Rate, Neonatal Mortality Rate, perinatal mortality rate, fertility rates",
                "Maternal death audit"
              ]
            },
            {
              heading: "National health programs",
              items: ["National health programs related to RMNCH+A (Reproductive, Maternal, Newborn and Child Health + Adolescent Health)"]
            },
            {
              heading: "Current trends in midwifery and OBG nursing",
              items: [
                "Respectful maternity and newborn care (RMNC)",
                "Midwifery-led care units (MLCU)",
                "Women centered care, physiologic birthing and demedicalization of birth",
                "Birthing centers, water birth, lotus birth",
                "Essential competencies for midwifery practice (ICM)",
                "Universal rights of child-bearing women",
                "Sexual and reproductive health and rights",
                "Women's expectations & choices about care"
              ]
            },
            {
              heading: "Legal provisions in midwifery practice in India",
              items: [
                "INC / MOH&FW regulations",
                "ICM code of ethics",
                "Ethical issues in maternal and neonatal care",
                "Adoption laws, MTP Act, Pre-Natal Diagnostic Test (PNDT) Act, surrogate mothers",
                "Roles and responsibilities of a midwife / nurse practitioner midwife in different settings (hospital / community)",
                "Scope of practice for midwives"
              ]
            }
          ]
        },
        {
          roman: "II",
          title: "Anatomy & Physiology of Human Reproductive System and Conception",
          hours: { t: 6, l: 3, c: 0 },
          outcomes: ["Review the anatomy and physiology of the human reproductive system (maternal, fetal & newborn physiology)."],
          topics: [
            {
              heading: "Review",
              items: [
                "Female organs of reproduction",
                "Female pelvis — bones, joints, ligaments, planes, diameters, landmarks, inclination, pelvic variations",
                "Foetal skull — bones, sutures, fontanelles, diameters, moulding",
                "Fetopelvic relationship",
                "Physiology of menstrual cycle, menstrual hygiene",
                "Fertilization, conception and implantation",
                "Embryological development",
                "Placental development and function, placental barrier",
                "Fetal growth and development",
                "Fetal circulation & nutrition"
              ]
            }
          ]
        },
        {
          roman: "III",
          title: "Assessment & Management of Normal Pregnancy (Antenatal)",
          hours: { t: 12, l: 10, c: 40 },
          outcomes: [
            "Provide preconception care to eligible couples.",
            "Describe the physiology, assessment and management of normal pregnancy.",
            "Demonstrate knowledge, attitude and skills of midwifery practice throughout the 1st, 2nd and 3rd trimesters."
          ],
          topics: [
            {
              heading: "Pre-pregnancy care",
              items: [
                "Review of sexual development (self learning)",
                "Socio-cultural aspects of human sexuality (self learning)",
                "Preconception care",
                "Pre-conception counseling (including awareness regarding normal birth); genetic counseling (self learning)",
                "Planned parenthood"
              ]
            },
            {
              heading: "Normal pregnancy",
              items: [
                "Physiological changes during pregnancy",
                "Assess and confirm pregnancy — diagnosis of pregnancy: signs, differential diagnosis and confirmatory tests",
                "Review of maternal nutrition & malnutrition",
                "Building partnership with women following RMC protocol",
                "Fathers' engagement in maternity care"
              ]
            },
            {
              heading: "Antenatal care — 1st Trimester",
              items: [
                "Antenatal assessment: history taking, physical examination, breast examination, laboratory investigation",
                "Identification and management of minor discomforts of pregnancy",
                "Antenatal care as per GoI guidelines",
                "Antenatal counseling (lifestyle changes, nutrition, shared decision making, risky behaviour, sexual life during pregnancy, immunization, etc.)",
                "Danger signs during pregnancy",
                "Respectful care and compassionate communication",
                "Recording and reporting as per GoI guidelines",
                "Role of Doula / ASHAs"
              ]
            },
            {
              heading: "Antenatal care — 2nd Trimester",
              items: [
                "Antenatal assessment: abdominal palpation, fetal assessment, auscultate fetal heart rate — Doppler and Pinnard's stethoscope",
                "Assessment of fetal well-being: DFMC, biophysical profile, non-stress test, cardiotocography, USG, vibro-acoustic stimulation, biochemical tests",
                "Antenatal care; women centered care",
                "Respectful care and compassionate communication",
                "Health education on IFA, calcium and vitamin D supplementation, glucose tolerance test, etc.",
                "Education and management of physiological changes and discomforts of the 2nd trimester",
                "Rh negative and prophylactic anti-D",
                "Referral and collaboration, empowerment",
                "Ongoing risk assessment",
                "Maternal mental health"
              ]
            },
            {
              heading: "Antenatal care — 3rd Trimester",
              items: [
                "Antenatal assessment: abdominal palpation, fetal assessment, auscultate fetal heart rate — Doppler and Pinnard's stethoscope",
                "Education and management of physiological changes and discomforts of the 3rd trimester",
                "Third trimester tests and screening",
                "Fetal engagement in late pregnancy",
                "Childbirth preparation classes",
                "Birth preparedness and complication readiness including micro birth planning",
                "Danger signs of pregnancy — recognition of ruptured membranes",
                "Education on alternative birthing positions — women's preferred choices, birth companion",
                "Ongoing risk assessment; cultural needs; women centered care",
                "Respectful and compassionate communication",
                "Health education on exclusive breastfeeding",
                "Role of Doula / ASHAs"
              ]
            }
          ]
        },
        {
          roman: "IV",
          title: "Physiology, Management & Care during Labour",
          hours: { t: 12, l: 12, c: 80 },
          outcomes: [
            "Apply the physiology of labour in promoting normal childbirth.",
            "Describe the management and care during labour.",
            "Discuss how to maintain a safe environment for labour.",
            "Work effectively for pain management during labour.",
            "Discuss how the midwife provides care and support during birth to enhance physiological birthing and promote normal birth.",
            "Assess and provide care of the newborn immediately following birth.",
            "Discuss the impact of labour and birth as a transitional event in the woman's life.",
            "Ensure initiation of breast feeding and adequate latching."
          ],
          topics: [
            {
              heading: "Normal labour and birth — general management",
              items: [
                "Onset of birth / labour",
                "Per vaginal examination (if necessary)",
                "Stages of labour",
                "Organization of labour room — triage, preparation for birth",
                "Positive birth environment",
                "Respectful care and communication",
                "Drugs used in labour as per GoI guidelines"
              ]
            },
            {
              heading: "First Stage",
              items: [
                "Physiology of normal labour",
                "Monitoring progress of labour using partograph / labour care guide",
                "Assessing and monitoring fetal well-being",
                "Evidence based care during the 1st stage of labour",
                "Pain management in labour (non-pharmacological)",
                "Psychological support — managing fear",
                "Activity and ambulation during the first stage of labour",
                "Nutrition during labour",
                "Promote positive childbirth experience for women",
                "Birth companion; role of Doula / ASHAs"
              ]
            },
            {
              heading: "Second Stage",
              items: [
                "Physiology (mechanism of labour)",
                "Signs of imminent labour",
                "Intrapartum monitoring",
                "Birth position of choice",
                "Vaginal examination",
                "Psychological support; non-directive coaching",
                "Evidence based management of physiological birth / conduction of normal childbirth",
                "Essential newborn care (ENBC)",
                "Immediate assessment and care of the newborn",
                "Role of Doula / ASHAs"
              ]
            },
            {
              heading: "Third Stage",
              items: [
                "Physiology — placental separation and expulsion, hemostasis",
                "Physiological management of the third stage of labour",
                "Active management of the third stage of labour (recommended)",
                "Examination of placenta, membranes and vessels",
                "Assess perineal / vaginal tear / injuries and suture if required",
                "Insertion of postpartum IUCD",
                "Immediate perineal care",
                "Initiation of breast feeding; skin-to-skin contact",
                "Newborn resuscitation"
              ]
            },
            {
              heading: "Fourth Stage",
              items: [
                "Observation, critical analysis and management of mother and newborn",
                "Maternal assessment — observation of fundal height, uterine consistency, urine output, blood loss",
                "Documentation and record of birth",
                "Breastfeeding and latching",
                "Managing uterine cramp",
                "Alternative / complementary therapies",
                "Role of Doula / ASHAs; various childbirth practices",
                "Safe environment for mother and newborn to promote bonding",
                "Maintaining records and reports"
              ]
            }
          ]
        },
        {
          roman: "V",
          title: "Postpartum Care / Ongoing Care of Women",
          hours: { t: 7, l: 6, c: 40 },
          outcomes: ["Describe the physiology, management and care of normal puerperium."],
          topics: [
            {
              heading: null,
              items: [
                "Normal puerperium — physiology, duration",
                "Post-natal assessment and care — facility and home-based care",
                "Perineal hygiene and care",
                "Bladder and bowel function",
                "Minor disorders of puerperium and its management",
                "Physiology of lactation and lactation management",
                "Postnatal counseling and psychological support",
                "Normal postnatal baby blues and recognition of post-natal depression",
                "Transition to parenthood",
                "Care for the woman up to 6 weeks after childbirth",
                "Cultural competence (taboos related to postnatal diet and practices)",
                "Diet during lactation (review)",
                "Post-partum family planning",
                "Follow-up of postnatal mothers",
                "Drugs used in the postnatal period",
                "Records and reports"
              ]
            }
          ]
        },
        {
          roman: "VI",
          title: "Assessment & Ongoing Care of Normal Neonates",
          hours: { t: 7, l: 7, c: 40 },
          outcomes: [
            "Discuss the need for and provision of compassionate, family-centered midwifery care of the newborn.",
            "Describe the assessment and care of the normal neonate."
          ],
          topics: [
            {
              heading: null,
              items: [
                "Family centered care",
                "Respectful newborn care and communication",
                "Normal neonate — physiological adaptation",
                "Newborn assessment — screening for congenital anomalies",
                "Care of newborn up to 6 weeks after childbirth (routine care of newborn)",
                "Skin-to-skin contact and thermoregulation",
                "Infection prevention",
                "Immunization",
                "Minor disorders of newborn and its management"
              ]
            }
          ]
        },
        {
          roman: "VII",
          title: "Family Welfare Services",
          hours: { t: 8, l: 2, c: 40 },
          outcomes: [
            "Explain various methods of family planning and the role of nurse / midwife in providing family planning services.",
            "Describe youth friendly services and the role of nurses / midwives.",
            "Recognize the role of nurses / midwives in gender based violence."
          ],
          topics: [
            {
              heading: "Family welfare services",
              items: [
                "Impact of early / frequent childbearing",
                "Comprehensive range of family planning methods — temporary (hormonal, non-hormonal, barrier) and permanent (male & female sterilization)",
                "Action, effectiveness, advantages, disadvantages, myths, misconceptions and medical eligibility criteria (MEC) for use of various family planning methods",
                "Emergency contraceptives",
                "Recent trends and research in contraception",
                "Family planning counseling using the Balanced Counseling Strategy (BCS)",
                "Legal and rights aspects of FP",
                "Human rights aspects of FP — adolescents",
                "Youth friendly services — SRHR services, policies affecting SRHR and attitude of nurses & midwives in provision of services (review)",
                "Importance of follow-up and recommended timing"
              ]
            },
            {
              heading: "Gender related issues in SRH",
              items: [
                "Gender based violence — physical, sexual and abuse; laws affecting GBV and role of nurse / midwife",
                "Special courts for abused people",
                "Gender sensitive health services including family planning"
              ]
            }
          ]
        }
      ],
      practiceCompetencies: [
        "Counsel women and their families on pre-conception care",
        "Demonstrate lab tests (e.g. urine pregnancy test)",
        "Perform antenatal assessment of pregnant women",
        "Assess and care for normal antenatal mothers",
        "Assist and perform specific investigations for antenatal mothers",
        "Counsel mothers and families on antenatal care and preparation for parenthood",
        "Conduct childbirth education classes",
        "Organize labour room",
        "Prepare and provide respectful maternity care for mothers in labour",
        "Perform per-vaginal examination for a woman in labour if indicated",
        "Conduct normal childbirth with essential newborn care",
        "Demonstrate skills in resuscitating the newborn",
        "Assist women in the transition to motherhood",
        "Perform postnatal and newborn assessment",
        "Provide care for postnatal mothers and their newborn",
        "Counsel mothers on postnatal and newborn care",
        "Perform PPIUCD insertion and removal",
        "Counsel women on family planning and participate in family welfare services",
        "Provide youth friendly health services",
        "Identify, assess, care for and refer women affected with gender based violence"
      ],
      skillLab: [
        "Urine pregnancy test",
        "Calculation of EDD, obstetrical score, gestational weeks",
        "Antenatal assessment",
        "Counseling antenatal mothers",
        "Micro birth planning",
        "PV examination",
        "Monitoring during first stage of labour — plotting and interpretation of partograph",
        "Preparation for delivery — setting up labour room, articles, equipment",
        "Mechanism of labour — normal",
        "Conduction of normal childbirth with essential newborn care",
        "Active management of third stage of labour",
        "Placental examination",
        "Newborn resuscitation",
        "Monitoring during fourth stage of labour",
        "Postnatal assessment",
        "Newborn assessment",
        "Kangaroo mother care",
        "Family planning counseling",
        "PPIUCD insertion and removal"
      ],
      clinical: [
        {
          area: "Antenatal OPD & Antenatal ward",
          weeks: "1 week",
          skills: [
            "History collection, physical & obstetric examination",
            "Pregnancy confirmation test, urine testing",
            "Blood testing for haemoglobin, grouping & typing, malaria",
            "KICK chart, USG / NST",
            "Antenatal counseling, preparation for childbirth, birth preparedness and complication readiness"
          ]
        },
        {
          area: "Labour room",
          weeks: "3 weeks",
          skills: [
            "Assessment of woman in labour; partograph; PV examination when indicated",
            "Care during first stage; pain management; upright & alternative positions",
            "Preparation for labour — articles, physical, psychological",
            "Conduction of normal childbirth; essential newborn care; newborn resuscitation",
            "Active management of third stage; monitoring & care during fourth stage"
          ]
        },
        {
          area: "Postpartum clinic & Postnatal ward (incl. FP unit)",
          weeks: "2 weeks",
          skills: [
            "Postnatal assessment; care of normal postnatal mothers & newborn",
            "Lactation management",
            "Postnatal counseling; health teaching on postnatal & newborn care",
            "Family welfare counseling; PPIUCD insertion & removal"
          ]
        }
      ]
    },

    /* ════════════════════════════════════════════════════════════════
       OBG NURSING - II  (VII SEMESTER)
       ════════════════════════════════════════════════════════════════ */
    {
      id: "obg2",
      course: "OBG-II",
      fullTitle: "Midwifery / Obstetrics and Gynaecology (OBG) Nursing - II",
      subtitle: "including Safe Delivery App module",
      placement: "VII Semester",
      theory: "3 Credits (60 hours)",
      practicum: "Skill Lab: 1 Credit (40 hrs) · Clinical: 4 Credits (320 hrs)",
      description:
        "Builds knowledge and competencies on the principles of high-risk obstetric and gynaecology nursing — respectful maternity care for high-risk women during antenatal, natal and postnatal periods, initial management and referral of high-risk neonates, and care of women with gynaecological disorders.",
      competencies: [
        "Describe the assessment, initial management, referral and respectful maternity care of women with high-risk pregnancy.",
        "Demonstrate competency in identifying deviation from normal pregnancy.",
        "Describe the assessment, initial management, referral and nursing care of women with high-risk labour.",
        "Assist in the conduction of abnormal vaginal deliveries and caesarean section.",
        "Describe the assessment, initial management, referral and nursing care of women with abnormal postnatal conditions.",
        "Demonstrate competency in the initial management of complications during the postnatal period.",
        "Demonstrate competency in providing care for high-risk newborn.",
        "Apply the nursing process in caring for high-risk women and their families.",
        "Describe the assessment and management of women with gynaecological disorders.",
        "Demonstrate skills in performing and assisting in specific gynaecological procedures.",
        "Describe the drugs used in obstetrics and gynaecology.",
        "Counsel and care for couples with infertility.",
        "Describe artificial reproductive technology."
      ],
      units: [
        {
          roman: "I",
          title: "Recognition & Management of Problems during Pregnancy",
          hours: { t: 12, l: 10, c: 80 },
          outcomes: [
            "Describe the assessment, initial management and referral of women with problems during pregnancy.",
            "Support women with complicated pregnancy and facilitate a safe and positive birthing outcome."
          ],
          topics: [
            {
              heading: null,
              items: [
                "Assessment of high-risk pregnancy",
                "Problems / complications of pregnancy",
                "Hyperemesis gravidarum",
                "Bleeding in early pregnancy — abortion, ectopic pregnancy, vesicular mole",
                "Unintended or mistimed pregnancy",
                "Post abortion care & counseling",
                "Bleeding in late pregnancy — placenta previa, abruptio placenta, trauma",
                "Medical conditions complicating pregnancy — anemia, PIH / pre-eclampsia, eclampsia, GDM, cardiac disease, pulmonary disease, thyrotoxicosis, STDs, HIV, Rh incompatibility",
                "Infections in pregnancy — urinary tract infection; bacterial, viral, protozoal, fungal; malaria in pregnancy",
                "Surgical conditions complicating pregnancy — appendicitis, acute abdomen",
                "COVID-19 & pregnancy and children",
                "Hydramnios",
                "Multiple pregnancy",
                "Abnormalities of placenta and cord",
                "Intra-uterine growth restriction",
                "Intra-uterine fetal death",
                "Gynaecological conditions complicating pregnancy",
                "Mental health issues during pregnancy",
                "Adolescent pregnancy",
                "Elderly primi, grand multiparity",
                "Management and care of conditions as per the GoI protocol",
                "Policy for referral services",
                "Drugs used in management of high-risk pregnancies",
                "Maintenance of records and reports"
              ]
            }
          ]
        },
        {
          roman: "II",
          title: "Recognition & Management of Abnormal Labour",
          hours: { t: 20, l: 15, c: 80 },
          outcomes: ["Identify, provide initial management and refer women with problems during labour within the scope of midwifery practice."],
          topics: [
            {
              heading: null,
              items: [
                "Preterm labour — prevention and management (use of antenatal corticosteroids in preterm labour)",
                "Premature rupture of membranes",
                "Malpositions and abnormal presentations (posterior position, breech, brow, face, shoulder)",
                "Contracted pelvis, cephalo-pelvic disproportion (CPD)",
                "Disorders of uterine action — prolonged labour, precipitate labour, dysfunctional labour",
                "Complications of third stage — retained placenta, injuries to birth canal, postpartum haemorrhage (bimanual compression of uterus, aortic compression, uterine balloon tamponade)",
                "Obstetric emergencies — foetal distress, ruptured uterus, cord prolapse, shoulder dystocia, uterine inversion, vasa previa, obstetrical shock, amniotic fluid embolism",
                "Episiotomy and suturing",
                "Obstetric procedures — forceps delivery, vacuum delivery, version",
                "Induction of labour — medical & surgical",
                "Caesarean section — indications and preparation",
                "Nursing management of women undergoing obstetric operations and procedures",
                "Drugs used in management of abnormal labour",
                "Anaesthesia and analgesia in obstetrics"
              ]
            }
          ]
        },
        {
          roman: "III",
          title: "Recognition & Management of Postnatal Problems",
          hours: { t: 9, l: 5, c: 40 },
          outcomes: ["Describe the assessment, initial management, referral and nursing care of women with abnormal postnatal conditions."],
          topics: [
            {
              heading: null,
              items: [
                "Physical examination, identification of deviation from normal"
              ]
            },
            {
              heading: "Puerperal complications and their management",
              items: [
                "Puerperal pyrexia",
                "Puerperal sepsis",
                "Urinary complications",
                "Secondary postpartum haemorrhage",
                "Vulval haematoma",
                "Breast engorgement including mastitis / breast abscess, feeding problem",
                "Thrombophlebitis; DVT",
                "Uterine sub-involution",
                "Vesico-vaginal fistula (VVF), recto-vaginal fistula (RVF)",
                "Postpartum depression / psychosis"
              ]
            },
            {
              heading: null,
              items: ["Drugs used in abnormal puerperium", "Policy about referral"]
            }
          ]
        },
        {
          roman: "IV",
          title: "Assessment & Management of High-Risk Newborn",
          hours: { t: 7, l: 5, c: 40 },
          outcomes: ["Describe high-risk neonates and their nursing management."],
          topics: [
            {
              heading: "Review",
              items: [
                "Models of newborn care in India — NBCC; SNCUs",
                "Screening of high-risk newborn",
                "Protocols, levels of neonatal care, infection control",
                "Prematurity, post-maturity",
                "Low birth weight",
                "Kangaroo mother care",
                "Birth asphyxia / hypoxic encephalopathy",
                "Neonatal sepsis",
                "Hypothermia",
                "Respiratory distress",
                "Jaundice",
                "Neonatal infections",
                "High fever",
                "Convulsions",
                "Neonatal tetanus",
                "Congenital anomalies",
                "Baby of HIV positive mothers",
                "Baby of Rh negative mothers",
                "Birth injuries",
                "SIDS (Sudden Infant Death Syndrome) prevention; compassionate care",
                "Calculation of fluid requirements; EBM / formula feeds / tube feeding",
                "Home based newborn care program — community-facility integration in newborn care",
                "Decision making about management and referral",
                "Bereavement counseling",
                "Drugs used for high-risk newborns",
                "Maintenance of records and reports"
              ]
            }
          ]
        },
        {
          roman: "V",
          title: "Assessment & Management of Women with Gynaecological Disorders",
          hours: { t: 12, l: 5, c: 80 },
          outcomes: ["Describe the assessment and management of women with gynaecological disorders."],
          topics: [
            {
              heading: null,
              items: [
                "Gynaecological assessment — history and physical assessment",
                "Breast self-examination",
                "Congenital abnormalities of female reproductive system"
              ]
            },
            {
              heading: "Etiology, pathophysiology, clinical manifestations, diagnosis, treatment & management of women with:",
              items: [
                "Menstrual abnormalities",
                "Abnormal uterine bleeding",
                "Pelvic inflammatory disease",
                "Infections of the reproductive tract",
                "Uterine displacement",
                "Endometriosis",
                "Uterine and cervical fibroids and polyps",
                "Tumours — uterine, cervical, ovarian, vaginal, vulval",
                "Cysts — ovarian, vulval",
                "Cystocele, urethrocele, rectocele",
                "Genito-urinary fistulas",
                "Breast disorders — infections, deformities, cysts, tumours",
                "HPV vaccination",
                "Disorders of puberty and menopause",
                "Hormonal replacement therapy"
              ]
            },
            {
              heading: "Assessment & management of couples with infertility",
              items: [
                "Infertility — definition, causes",
                "Counseling the infertile couple",
                "Investigations — male and female",
                "Artificial reproductive technology",
                "Surrogacy, sperm and ovum donation, cryopreservation"
              ]
            },
            {
              heading: null,
              items: [
                "Adoption — counseling, procedures",
                "Injuries and trauma; sexual violence",
                "Drugs used in treatment of gynaecological disorders"
              ]
            }
          ]
        }
      ],
      practiceCompetencies: [
        "Identify, stabilize and refer antenatal women with complications",
        "Provide care to antenatal women with complications",
        "Provide post abortion care & counseling",
        "Assist in the conduction of abnormal vaginal deliveries and caesarean section",
        "Demonstrate skills in resuscitating the newborn",
        "Assist and manage complications during labour",
        "Identify postnatal and neonatal complications, stabilize and refer them",
        "Provide care for high-risk antenatal, intranatal and postnatal women and families using nursing process approach",
        "Provide care for high-risk newborn",
        "Assist in advanced clinical procedures in midwifery and obstetric nursing",
        "Provide care for women during their non-childbearing period",
        "Assess and care for women with gynaecological disorders",
        "Demonstrate skills in performing and assisting in specific gynaecological procedures",
        "Counsel and care for couples with infertility"
      ],
      skillLab: [
        "Antenatal assessment and identification of complications",
        "Post abortion care & counseling",
        "Counseling antenatal women for complication readiness",
        "Mechanism of labour — abnormal",
        "Assisting in conduction of abnormal vaginal deliveries and caesarean section",
        "Management of complications during pregnancy / labour / postpartum (case studies / simulated scenarios)",
        "Administration of Inj. Magnesium Sulphate",
        "Starting and maintaining an oxytocin drip for PPH",
        "Management of PPH — bimanual compression of uterus",
        "Management of PPH — balloon tamponade",
        "Instruments used in obstetrics and gynaecology",
        "Visual inspection of cervix with acetic acid (VIA)",
        "Cervical biopsy",
        "Breast examination",
        "Counseling of infertile couples"
      ],
      clinical: [
        {
          area: "Antenatal OPD / infertility & reproductive medicine clinics / antenatal ward",
          weeks: "2 weeks",
          skills: [
            "KICK chart, DFMC; assist in NST / CTG / USG and advanced diagnostic procedures",
            "Care of antenatal women with complications of pregnancy",
            "Antenatal counseling; preparation for childbirth, birth preparedness & complication readiness",
            "Post abortion care & counseling",
            "Counseling infertile couples"
          ]
        },
        {
          area: "Labour room",
          weeks: "2 weeks",
          skills: [
            "Assessment of woman in labour; partograph; PV examination if indicated",
            "Conduction of normal childbirth; essential newborn care; newborn resuscitation",
            "Active management of third stage; monitoring & care during fourth stage",
            "Identify, stabilize, refer & assist in management of prolonged labour, cervical dystocia, CPD, contracted pelvis",
            "Assist in abnormal deliveries — posterior position, breech, twins, vacuum, forceps, shoulder dystocia",
            "Assist in cervical encerclage, D&C, D&E; manage birth-canal trauma, retained placenta, PPH, uterine atony, obstetric shock"
          ]
        },
        {
          area: "Postnatal ward",
          weeks: "1 week",
          skills: [
            "Postnatal history collection & physical examination; identify postnatal complications",
            "Care of postnatal mothers — abnormal deliveries, caesarean section",
            "Care of normal newborn; lactation management",
            "Postnatal counseling; health teaching; family welfare counseling; PPIUCD insertion & removal"
          ]
        },
        {
          area: "Neonatal Intensive Care Unit",
          weeks: "1 week",
          skills: [
            "Neonatal assessment — identification of complications, congenital anomalies",
            "Neonatal resuscitation; phototherapy & management of jaundice; assist in exchange transfusion",
            "Neonatal feeding — spoon & katori, paladai, NG tube",
            "Care of baby in incubator, ventilator, warmer; infection control in nursery",
            "Neonatal medications; starting IV line for newborn, drug calculation"
          ]
        },
        {
          area: "Obstetric / Gynae OT & Gynaecology ward",
          weeks: "2 weeks",
          skills: [
            "Observe / assist in caesarean section; management of retained placenta",
            "Assist in gynaecological surgeries, hysterectomy, uterine rupture",
            "Tray set-up for obstetric and gynaecological surgeries",
            "Care of women with gynaecological conditions; health education"
          ]
        }
      ]
    },

    /* ════════════════════════════════════════════════════════════════
       NURSING RESEARCH AND STATISTICS  (VII SEMESTER)
       ════════════════════════════════════════════════════════════════ */
    {
      id: "nrs",
      course: "NRS",
      fullTitle: "Nursing Research and Statistics",
      placement: "VII Semester",
      theory: "2 Credits (40 hours)",
      practicum: "Practicum (Lab/Skill Lab): 1 Credit (40 hrs) · Clinical Project: 40 hrs",
      description:
        "The Course is designed to enable students to develop an understanding of basic concepts of research, research process and statistics. It is further structured to conduct/participate in need-based research studies in various settings and utilize the research findings to provide quality nursing care.",
      units: [
        {
          roman: "I & II",
          title: "Research and Research Process",
          hours: { t: 10 },
          outcomes: [
            "Explain the introduction and need for nursing research.",
            "Define research and nursing research.",
            "Describe the steps of the scientific method and characteristics of good research.",
            "Outline the steps of the research process.",
            "Explain Evidence-Based Practice — concept, purposes, steps, and barriers.",
            "Formulate a research problem, objectives, and hypotheses."
          ],
          topics: [
            {
              heading: "Introduction",
              items: [
                "Introduction and need for nursing research",
                "Definition of Research and Nursing Research",
                "Steps of scientific method and Characteristics of good research",
                "Steps of Research process overview"
              ]
            },
            {
              heading: "Evidence-Based Practice (EBP)",
              items: [
                "Concept and Meaning of EBP",
                "Purposes of EBP",
                "Steps of EBP Process",
                "Barriers to EBP"
              ]
            },
            {
              heading: "Research Problem / Question",
              items: [
                "Identification of problem area",
                "Problem statement",
                "Criteria of a good research problem",
                "Writing objectives and hypotheses",
                "Limitations and Delimitations of research"
              ]
            }
          ]
        },
        {
          roman: "III",
          title: "Review of Literature",
          hours: { t: 4 },
          outcomes: [
            "Identify sources and locations for literature review.",
            "Conduct online searches using CINAHL, Cochrane, and PubMed.",
            "Describe the purposes and method of review of literature."
          ],
          topics: [
            {
              heading: "Literature Review",
              items: [
                "Location and Sources of literature",
                "Online search — CINAHL, COCHRANE, PubMed, MEDLINE",
                "Purposes and Method of review of literature"
              ]
            }
          ]
        },
        {
          roman: "IV",
          title: "Research Approaches and Designs",
          hours: { t: 6 },
          outcomes: [
            "Differentiate between historical, survey, and experimental research approaches.",
            "Compare qualitative and quantitative research designs."
          ],
          topics: [
            {
              heading: "Research Approaches",
              items: [
                "Historical, Survey, and Experimental approaches"
              ]
            },
            {
              heading: "Research Designs",
              items: [
                "Qualitative research designs",
                "Quantitative research designs"
              ]
            }
          ]
        },
        {
          roman: "V",
          title: "Sampling and Data Collection",
          hours: { t: 8 },
          outcomes: [
            "Define population, sample, and sampling criteria.",
            "Identify factors influencing sampling and types of sampling techniques.",
            "Describe data collection methods, instruments, validity, and reliability.",
            "Apply ethical principles in data collection and conduct a pilot study."
          ],
          topics: [
            {
              heading: "Sampling",
              items: [
                "Definition of Population, Sample, Sampling criteria",
                "Factors influencing sampling process",
                "Types of sampling techniques — probability and non-probability"
              ]
            },
            {
              heading: "Data Collection",
              items: [
                "Data — why, what, from whom, when, and where to collect",
                "Data collection methods and instruments",
                "Methods: Questioning, Interviewing, Observations, Record analysis, Measurement",
                "Types of instruments — structured, semi-structured, unstructured",
                "Validity and Reliability of the Instrument",
                "Research ethics and Informed Consent",
                "Pilot study",
                "Data collection procedure"
              ]
            }
          ]
        },
        {
          roman: "VI",
          title: "Analysis of Data",
          hours: { t: 4 },
          outcomes: [
            "Describe the processes of compilation, tabulation, classification, summarization, presentation, and interpretation of data."
          ],
          topics: [
            {
              heading: "Data Analysis",
              items: [
                "Compilation, Tabulation, Classification of data",
                "Summarization and Presentation of data",
                "Interpretation of data"
              ]
            }
          ]
        },
        {
          roman: "VII",
          title: "Introduction to Statistics",
          hours: { t: 6 },
          outcomes: [
            "Define statistics and identify its uses in nursing research.",
            "Describe frequency distribution and graphical presentation.",
            "Calculate mean, median, mode, and standard deviation.",
            "Explain normal probability and tests of significance.",
            "Compute co-efficient of correlation.",
            "Identify statistical packages and their applications."
          ],
          topics: [
            {
              heading: "Statistics Basics",
              items: [
                "Definition, use of statistics, and scales of measurement (Nominal, Ordinal, Interval, Ratio)",
                "Frequency distribution and graphical presentation of data (bar chart, histogram, pie chart)",
                "Measures of central tendency — Mean, Median, Mode",
                "Measures of dispersion — Standard deviation",
                "Normal probability curve"
              ]
            },
            {
              heading: "Inferential Statistics",
              items: [
                "Tests of significance — t-test, chi-square test, ANOVA",
                "Co-efficient of correlation (Pearson, Spearman)",
                "Statistical packages — SPSS, R, MS-Excel and their applications"
              ]
            }
          ]
        },
        {
          roman: "VIII",
          title: "Communication and Utilization of Research",
          hours: { t: 2 },
          outcomes: [
            "Describe the communication of research findings including verbal report.",
            "Write a research report and a scientific article/paper.",
            "Conduct a critical review of published research including publication ethics.",
            "Apply research findings to clinical practice."
          ],
          topics: [
            {
              heading: "Communication of Research",
              items: [
                "Communication of research findings (including Verbal report)",
                "Writing research report — format and structure",
                "Writing a scientific article/paper for journal publication",
                "Critical review of published research",
                "Publication ethics — plagiarism, authorship, predatory journals",
                "Utilization of research findings in nursing practice (EBP)",
                "Conducting group research project"
              ]
            }
          ]
        }
      ],
      skillLab: [
        "Formulate a research problem and write objectives and hypotheses",
        "Conduct a review of literature using CINAHL, Cochrane, and PubMed databases",
        "Develop and critically assess a data collection instrument (questionnaire/checklist)",
        "Establish validity and reliability of an instrument",
        "Analyse data using descriptive statistics (mean, median, mode, SD) on SPSS/Excel",
        "Prepare and present tables, charts, and graphs",
        "Write a mini research report",
        "Critical appraisal of a published research article"
      ]
    }
  ]
};
