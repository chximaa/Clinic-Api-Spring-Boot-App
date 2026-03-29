/* ═══════════════════════════════════════════
   CLINIC API MASTERCLASS — script.js
   ═══════════════════════════════════════════ */

// ─── NAVIGATION ───
function goTo(sectionId, linkEl) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById(sectionId);
  if (target) target.classList.add('active');
  // Update nav links
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (linkEl) linkEl.classList.add('active');
  // Close sidebar on mobile
  if (window.innerWidth < 900) {
    document.getElementById('sidebar').classList.remove('open');
  }
  window.scrollTo(0, 0);
}

// ─── SIDEBAR TOGGLE ───
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ─── THEME ───
function toggleTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('themeBtn');
  if (html.dataset.theme === 'dark') {
    html.dataset.theme = 'light';
    btn.textContent = '☀️ Mode clair';
  } else {
    html.dataset.theme = 'dark';
    btn.textContent = '🌙 Mode sombre';
  }
}

// ─── NAV FILTER ───
function filterNav(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('#navList .nav-link').forEach(link => {
    const parent = link.parentElement;
    parent.style.display = link.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
  document.querySelectorAll('#navList .nav-section').forEach(s => s.style.display = '');
}

// ─── ANNOTATION FILTER ───
function filterAnnotations(cat, btn) {
  document.querySelectorAll('.ann-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.ann-card').forEach(card => {
    if (cat === 'all' || card.dataset.cat === cat) {
      card.style.display = '';
      card.style.animation = 'fadeIn 0.3s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

// ─── FLOW SELECTOR ───
function showFlow(flowId, btn) {
  document.querySelectorAll('.flow-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.flow-content').forEach(f => f.classList.remove('active'));
  const target = document.getElementById('flow-' + flowId);
  if (target) {
    target.classList.add('active');
    target.style.animation = 'fadeIn 0.3s ease';
  }
}

// ═══════════════════════════════════════════
//  QUIZ DATA — 20 questions
// ═══════════════════════════════════════════
const QUIZ_DATA = [
  {
    q: "Que fait exactement l'annotation @SpringBootApplication ?",
    options: [
      "A) Elle démarre le serveur Tomcat uniquement",
      "B) Elle combine @Configuration + @EnableAutoConfiguration + @ComponentScan",
      "C) Elle crée automatiquement la base de données",
      "D) Elle configure Swagger automatiquement"
    ],
    correct: 1,
    difficulty: "easy",
    explanation: "@SpringBootApplication est une méta-annotation qui combine trois annotations : @Configuration (classe de config), @EnableAutoConfiguration (configure automatiquement selon le classpath), et @ComponentScan (scanne les packages pour trouver les beans Spring)."
  },
  {
    q: "Dans ce projet, pourquoi utilise-t-on spring.jpa.hibernate.ddl-auto=none ?",
    options: [
      "A) Pour que Hibernate crée automatiquement les tables",
      "B) Pour désactiver la base de données H2",
      "C) Parce qu'on gère le schéma manuellement avec schema.sql",
      "D) Pour améliorer les performances de l'application"
    ],
    correct: 2,
    difficulty: "medium",
    explanation: "ddl-auto=none signifie qu'Hibernate n'intervient pas sur le schéma de la BDD. On utilise schema.sql (exécuté automatiquement par Spring avec spring.sql.init.mode=always) pour créer la table PATIENT. Si on avait ddl-auto=create, Hibernate créerait la table mais pourrait ignorer schema.sql ou créer des conflits."
  },
  {
    q: "Quelle est la différence entre @PathVariable et @RequestParam ?",
    options: [
      "A) @PathVariable est pour POST, @RequestParam est pour GET",
      "B) @PathVariable extrait depuis le chemin URL (/patients/{id}), @RequestParam depuis la query string (?nom=...)",
      "C) Il n'y a aucune différence, les deux font la même chose",
      "D) @RequestParam est déprécié dans Spring Boot 3"
    ],
    correct: 1,
    difficulty: "easy",
    explanation: "@PathVariable extrait une variable directement depuis le chemin URL. Ex: GET /api/patients/5 → id=5. @RequestParam extrait un paramètre depuis la query string (après le ?). Ex: GET /api/patients/search/nom?nom=Dup → nom='Dup'. Les deux servent à passer des données au controller mais de manière différente."
  },
  {
    q: "Pourquoi le diagnosticConfidentiel est annoté @JsonIgnore dans l'entité Patient ?",
    options: [
      "A) Pour que le champ ne soit pas sauvegardé en base de données",
      "B) Pour que ce champ soit ignoré lors de la sérialisation JSON (n'apparaît pas dans la réponse API)",
      "C) Pour améliorer les performances de la BDD",
      "D) Parce que JSON ne supporte pas les champs de type String"
    ],
    correct: 1,
    difficulty: "medium",
    explanation: "@JsonIgnore dit à Jackson (le convertisseur JSON de Spring) d'ignorer ce champ lors de la sérialisation. Le diagnostic existe bien en base de données (les tests le prouvent via patientRepository.findById(1)), mais il n'apparaît JAMAIS dans la réponse JSON de l'API. C'est une mesure de sécurité pour protéger les données médicales confidentielles."
  },
  {
    q: "Quelle annotation marque une classe comme couche d'accès aux données ET traduit les exceptions SQL en exceptions Spring ?",
    options: [
      "A) @Component",
      "B) @Service",
      "C) @Repository",
      "D) @DataSource"
    ],
    correct: 2,
    difficulty: "easy",
    explanation: "@Repository a deux rôles : 1) Marquer la classe comme bean Spring (comme @Component), 2) Activer la traduction automatique des exceptions SQL en exceptions Spring (DataAccessException). Cette traduction rend le code indépendant du SGBD utilisé."
  },
  {
    q: "Pourquoi le service vérifie-t-il l'existence du patient AVANT d'appeler repository.deleteById() ?",
    options: [
      "A) Pour améliorer les performances SQL",
      "B) deleteById() ne lance pas d'exception si l'ID n'existe pas — la vérification permet de retourner un 404 propre",
      "C) C'est obligatoire par la spécification JPA",
      "D) Pour éviter les transactions longues"
    ],
    correct: 1,
    difficulty: "medium",
    explanation: "Si on appelle directement repository.deleteById(999) avec un ID inexistant, Spring Data JPA ne lance aucune exception (il ignore silencieusement). En appelant d'abord getPatientById(id), on force la vérification : si le patient n'existe pas → PatientNotFoundException → GlobalExceptionHandler → HTTP 404 bien structuré."
  },
  {
    q: "Qu'est-ce que JpaRepository<Patient, Long> — que signifient les deux types génériques ?",
    options: [
      "A) Patient = nom de la table, Long = nombre maximum d'enregistrements",
      "B) Patient = type de l'entité gérée, Long = type de la clé primaire (ID)",
      "C) Patient = service associé, Long = timeout en secondes",
      "D) Patient = classe de configuration, Long = version de JPA"
    ],
    correct: 1,
    difficulty: "medium",
    explanation: "JpaRepository<T, ID> prend deux paramètres génériques : T = le type de l'entité (ici Patient), ID = le type de la clé primaire (ici Long pour le champ id). Cela permet à Spring Data de générer automatiquement les méthodes CRUD correctement typées : findById(Long id) retourne Optional<Patient>."
  },
  {
    q: "Quelle est la différence entre @RestController et @Controller ?",
    options: [
      "A) @RestController est pour les APIs, @Controller est pour les WebSockets",
      "B) @RestController = @Controller + @ResponseBody : les méthodes retournent directement des données JSON, pas une vue HTML",
      "C) @Controller ne peut pas avoir de @GetMapping",
      "D) @RestController est déprécié depuis Spring Boot 3"
    ],
    correct: 1,
    difficulty: "easy",
    explanation: "@Controller est le controller Spring MVC classique : il retourne des noms de vues (templates Thymeleaf/JSP). @RestController = @Controller + @ResponseBody : chaque méthode retourne directement des données (JSON/XML) sérialisées par Jackson, sans passer par un moteur de templates. Dans une API REST, on utilise toujours @RestController."
  },
  {
    q: "Question piège : Que se passe-t-il si on envoie POST /api/patients avec un champ 'nom' vide ?",
    options: [
      "A) Le patient est créé avec un nom vide",
      "B) Spring retourne une NullPointerException 500",
      "C) @Valid déclenche la validation → @NotBlank échoue → MethodArgumentNotValidException → GlobalExceptionHandler → HTTP 400",
      "D) H2 refuse l'insertion et retourne une SQL Exception 500"
    ],
    correct: 2,
    difficulty: "tricky",
    explanation: "Le flux exact est : @Valid dans le controller déclenche Bean Validation → @NotBlank sur Patient.nom échoue → Spring lance MethodArgumentNotValidException (pas NullPointerException) → GlobalExceptionHandler intercepte cette exception spécifique → retourne un ErrorResponse{status:400, message:'nom: Le nom est obligatoire'} → HTTP 400 Bad Request. Les deux dernières options (BDD ou NullPointer) sont incorrectes car la validation se passe AVANT d'aller à la BDD."
  },
  {
    q: "Pourquoi le DELETE retourne HTTP 204 et non 200 ?",
    options: [
      "A) C'est une erreur dans le code, ça devrait être 200",
      "B) HTTP 204 'No Content' signifie succès mais sans corps de réponse — logique pour une suppression",
      "C) HTTP 204 signifie 'Not Found'",
      "D) Spring Boot impose 204 pour toutes les réponses DELETE"
    ],
    correct: 1,
    difficulty: "medium",
    explanation: "HTTP 204 No Content est la réponse conventionnelle pour un DELETE réussi selon les bonnes pratiques REST. Le 200 OK implique qu'il y a un corps de réponse. Après une suppression, il n'y a rien à retourner (la ressource n'existe plus), donc 204 est sémantiquement correct. ResponseEntity.noContent().build() crée exactement ça."
  },
  {
    q: "Qu'est-ce que la 'dérivation de nom de méthode' (Query Method) dans Spring Data JPA ?",
    options: [
      "A) Hibernate renomme automatiquement les colonnes SQL",
      "B) Spring génère automatiquement le SQL à partir du nom de la méthode du repository (ex: findByNumeroSecu → WHERE NUMERO_SECU=?)",
      "C) Java renomme les méthodes en minuscules pour le SQL",
      "D) C'est une annotation @QueryMethod"
    ],
    correct: 1,
    difficulty: "medium",
    explanation: "Spring Data JPA analyse le nom de la méthode et génère automatiquement le SQL/JPQL correspondant. findByNumeroSecu(String s) → SELECT * FROM PATIENT WHERE NUMERO_SECU=?. Les mots-clés reconnus incluent : findBy, And, Or, Like, Between, OrderBy, LessThan, GreaterThan, etc. C'est une des fonctionnalités les plus puissantes de Spring Data JPA."
  },
  {
    q: "Que fait @RestControllerAdvice dans GlobalExceptionHandler ?",
    options: [
      "A) Il crée automatiquement les endpoints d'erreur",
      "B) Il marque la classe pour qu'elle intercepte les exceptions de TOUS les contrôleurs et retourne du JSON",
      "C) Il configure le format des dates dans les erreurs",
      "D) Il est équivalent à @Service"
    ],
    correct: 1,
    difficulty: "medium",
    explanation: "@RestControllerAdvice = @ControllerAdvice + @ResponseBody. @ControllerAdvice marque une classe comme gestionnaire global d'exceptions pour TOUS les contrôleurs (pas juste un seul). @ResponseBody garantit que les réponses sont sérialisées en JSON. Chaque méthode @ExceptionHandler intercepte un type d'exception spécifique et retourne une réponse HTTP structurée."
  },
  {
    q: "Qu'est-ce que H2 'in-memory' et quel est son impact sur les données ?",
    options: [
      "A) H2 utilise la RAM ET un fichier sur disque pour sauvegarder",
      "B) Les données sont stockées en RAM — elles sont PERDUES à chaque redémarrage",
      "C) H2 in-memory est plus lent qu'une vraie base de données",
      "D) 'in-memory' signifie que H2 utilise 1 Go de RAM maximum"
    ],
    correct: 1,
    difficulty: "easy",
    explanation: "jdbc:h2:mem:clinicdb crée une base de données H2 entièrement en mémoire RAM. Avantages : rapidité, aucune installation, parfait pour le dev/tests. Inconvénient majeur : TOUTES les données disparaissent à chaque arrêt de l'application. C'est pourquoi data.sql recharge les 5 patients à chaque démarrage."
  },
  {
    q: "Pourquoi utilise-t-on Optional<Patient> au lieu de Patient directement dans le repository ?",
    options: [
      "A) Optional est plus performant que retourner directement un objet",
      "B) Pour éviter NullPointerException : Optional signale explicitement que le résultat peut être absent (vide)",
      "C) JPA n'accepte pas Patient comme type de retour",
      "D) C'est une exigence de Spring Boot 3"
    ],
    correct: 1,
    difficulty: "medium",
    explanation: "Avant Optional, retourner null quand un objet n'est pas trouvé causait des NullPointerException si l'appelant ne vérifiait pas. Optional<Patient> rend explicite que le résultat peut être absent. .isPresent(), .orElse(), .orElseThrow() permettent de gérer proprement l'absence. Dans le service : .orElseThrow(() -> new PatientNotFoundException(id)) lance une exception métier propre."
  },
  {
    q: "Quelle est la différence entre JPQL et SQL natif ?",
    options: [
      "A) JPQL est plus lent que SQL natif",
      "B) JPQL utilise les noms des classes Java et champs (Patient, nom), SQL natif utilise les noms SQL (PATIENT, NOM)",
      "C) JPQL ne supporte pas les jointures",
      "D) Il n'y a aucune différence pratique"
    ],
    correct: 1,
    difficulty: "medium",
    explanation: "JPQL (Java Persistence Query Language) est le SQL de JPA. Il utilise les noms des entités Java (Patient) et leurs champs (nom, prenom) et non les noms SQL (PATIENT, NOM). Avantage : le code est indépendant du SGBD (fonctionne sur H2, MySQL, Oracle...). SQL natif est plus direct mais lie ton code à un SGBD spécifique. L'annotation @Query du projet utilise JPQL."
  },
  {
    q: "Quelle est la bonne pratique pour l'injection de dépendances en Spring Boot (question piège) ?",
    options: [
      "A) Toujours utiliser @Autowired sur les champs privés",
      "B) Toujours utiliser l'injection par constructeur (sans @Autowired explicite si un seul constructeur)",
      "C) Utiliser @Autowired sur les setters uniquement",
      "D) Spring Boot n'a pas de 'meilleure pratique' — tous les types sont équivalents"
    ],
    correct: 1,
    difficulty: "tricky",
    explanation: "L'injection par constructeur est recommandée par Spring et la communauté Java car : 1) Les dépendances sont OBLIGATOIRES (le bean ne peut pas exister sans elles), 2) Le champ peut être 'final' (immutable), 3) Testabilité : on peut passer un mock directement dans le constructeur lors des tests unitaires, 4) Détection de dépendances circulaires au démarrage plutôt qu'au runtime. Depuis Spring 4.3, si la classe n'a qu'un constructeur, @Autowired est optionnel."
  },
  {
    q: "Que signifie @GeneratedValue(strategy = GenerationType.IDENTITY) ?",
    options: [
      "A) Spring génère l'ID en utilisant un algorithme UUID",
      "B) La base de données génère l'ID automatiquement (AUTO_INCREMENT en H2/MySQL)",
      "C) Hibernate génère l'ID avec une table séparée",
      "D) L'ID est généré par @SpringBootApplication au démarrage"
    ],
    correct: 1,
    difficulty: "easy",
    explanation: "GenerationType.IDENTITY délègue la génération de l'ID à la colonne AUTO_INCREMENT de la base de données. Quand tu insères une ligne, la BDD attribue automatiquement le prochain ID disponible. H2 et MySQL supportent parfaitement IDENTITY. Pour PostgreSQL, on utilise souvent SEQUENCE (séquence SQL). Tu n'as jamais besoin de fournir l'ID lors d'une création."
  },
  {
    q: "Question piège : Quelle couche NE DOIT PAS contenir de logique métier ?",
    options: [
      "A) La couche Service",
      "B) La couche Repository/DAO",
      "C) La couche Controller",
      "D) Les deux : Controller et Repository"
    ],
    correct: 3,
    difficulty: "tricky",
    explanation: "Selon le principe de séparation des préoccupations (SoC) : Le Controller ne doit que recevoir les requêtes et déléguer au Service. Le Repository ne doit qu'interagir avec la BDD. La LOGIQUE MÉTIER doit être UNIQUEMENT dans le Service. Si tu vérifies les règles métier dans le Controller (ex: 'est-ce que ce numéro de sécu est déjà utilisé ?'), tu violes SoC et ton code devient difficile à tester et maintenir."
  },
  {
    q: "Pourquoi la méthode rechercherParNom utilise LOWER() dans le JPQL ?",
    options: [
      "A) Pour convertir les résultats en minuscules dans la réponse JSON",
      "B) Pour rendre la recherche insensible à la casse (case-insensitive) — 'dupont' trouve 'Dupont'",
      "C) H2 exige que toutes les requêtes soient en minuscules",
      "D) Pour améliorer les performances de l'index SQL"
    ],
    correct: 1,
    difficulty: "medium",
    explanation: "LOWER() convertit en minuscules pour la comparaison. LOWER(p.nom) LIKE LOWER(CONCAT('%', :nom, '%')) signifie : convertit le nom stocké en minuscules ET convertit le paramètre de recherche en minuscules, puis compare. Résultat : 'DUP', 'dup', 'Dup' trouvent tous 'Dupont'. Sans LOWER(), la recherche serait case-sensitive et 'dupont' ne trouverait pas 'Dupont'."
  },
  {
    q: "Si tu ajoutes @Column(nullable=false, unique=true) sur numeroSecu dans l'entité, que se passe-t-il avec ddl-auto=none ?",
    options: [
      "A) Spring lève une erreur au démarrage car @Column contredit schema.sql",
      "B) Hibernate met à jour la table automatiquement malgré ddl-auto=none",
      "C) @Column est ignoré pour le DDL — seul schema.sql contrôle la structure. @Column sert uniquement au mapping et à la validation niveau application",
      "D) @Column supprime la contrainte UNIQUE déjà présente dans schema.sql"
    ],
    correct: 2,
    difficulty: "tricky",
    explanation: "C'est une question piège fondamentale ! Avec ddl-auto=none, Hibernate ne modifie JAMAIS le schéma. @Column(unique=true) ne crée PAS de contrainte UNIQUE dans la BDD — c'est schema.sql qui la crée (UNIQUE sur numero_secu). @Column sert à mapper le nom de colonne, définir des métadonnées pour la validation niveau JPA, et générer le DDL SEULEMENT si ddl-auto=create/update. Sans ddl-auto approprié, c'est purement informatif."
  }
];

// ═══════════════════════════════════════════
//  QUIZ RENDERING
// ═══════════════════════════════════════════
let answeredCount = 0;
let score = 0;
let submitted = false;

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  container.innerHTML = '';
  answeredCount = 0;
  score = 0;
  submitted = false;
  document.getElementById('quizResults').style.display = 'none';
  updateScoreBar();

  QUIZ_DATA.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'quiz-item';
    div.id = 'quiz-item-' + index;

    const diffLabel = {
      easy: '🟢 Facile',
      medium: '🟡 Intermédiaire',
      hard: '🔴 Difficile',
      tricky: '🟣 Piège'
    }[item.difficulty];

    const diffClass = {
      easy: 'diff-easy',
      medium: 'diff-medium',
      hard: 'diff-hard',
      tricky: 'diff-tricky'
    }[item.difficulty];

    div.innerHTML = `
      <div class="quiz-q-header">
        <span class="quiz-num">Q${index + 1}</span>
        <span class="quiz-difficulty ${diffClass}">${diffLabel}</span>
        <span class="quiz-question">${item.q}</span>
      </div>
      <div class="quiz-options" id="options-${index}">
        ${item.options.map((opt, i) => `
          <label class="quiz-option" id="opt-${index}-${i}" onclick="selectAnswer(${index}, ${i})">
            <input type="radio" name="q${index}" value="${i}" />
            ${opt}
          </label>
        `).join('')}
      </div>
      <div class="quiz-explanation" id="exp-${index}">
        <strong>💡 Explication :</strong> ${item.explanation}
      </div>
    `;

    container.appendChild(div);
  });
}

function selectAnswer(qIndex, optIndex) {
  if (submitted) return;

  const wasAnswered = document.querySelector(`input[name="q${qIndex}"]:checked`);

  // Mark radio
  const radio = document.getElementById(`opt-${qIndex}-${optIndex}`).querySelector('input');
  radio.checked = true;

  if (!wasAnswered) {
    answeredCount++;
    updateScoreBar();
  }
}

function updateScoreBar() {
  document.getElementById('quizProgress').textContent =
    `${answeredCount} / ${QUIZ_DATA.length} répondues`;
}

function submitQuiz() {
  if (submitted) return;
  submitted = true;
  score = 0;

  QUIZ_DATA.forEach((item, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const item_div = document.getElementById('quiz-item-' + index);
    const expDiv = document.getElementById('exp-' + index);

    expDiv.classList.add('visible');

    if (!selected) {
      // Not answered — show correct
      document.getElementById(`opt-${index}-${item.correct}`).classList.add('show-correct');
      return;
    }

    const selectedVal = parseInt(selected.value);
    const selectedLabel = document.getElementById(`opt-${index}-${selectedVal}`);

    if (selectedVal === item.correct) {
      score++;
      selectedLabel.classList.add('selected-correct');
      item_div.classList.add('correct');
    } else {
      selectedLabel.classList.add('selected-wrong');
      document.getElementById(`opt-${index}-${item.correct}`).classList.add('show-correct');
      item_div.classList.add('incorrect');
    }
  });

  // Update score bar
  document.getElementById('scoreDisplay').textContent = score;
  document.getElementById('totalDisplay').textContent = QUIZ_DATA.length;

  // Show results
  const pct = Math.round((score / QUIZ_DATA.length) * 100);
  let msg, emoji;
  if (pct >= 90) { msg = "Excellent ! Tu es prêt·e pour l'examen oral ! 🎓"; emoji = '🏆'; }
  else if (pct >= 70) { msg = "Très bien ! Relis les sections en rouge pour perfectionner. 📚"; emoji = '✅'; }
  else if (pct >= 50) { msg = "Pas mal ! Continue à réviser les annotations et le flux de requête. 💪"; emoji = '📝'; }
  else { msg = "Continue ! Relis les sections Controller, Service, DAO et les Annotations. 🔁"; emoji = '🔄'; }

  const resultsDiv = document.getElementById('quizResults');
  resultsDiv.style.display = 'block';
  resultsDiv.innerHTML = `
    <div style="font-size:3rem;margin-bottom:8px">${emoji}</div>
    <div class="result-score">${score} / ${QUIZ_DATA.length}</div>
    <div class="result-label">${pct}% de réussite</div>
    <div class="result-msg">${msg}</div>
    <div style="margin-top:20px;font-size:0.82rem;color:var(--text3)">
      Fais défiler vers le haut pour voir les explications détaillées de chaque question.
    </div>
  `;

  resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

function resetQuiz() {
  renderQuiz();
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  renderQuiz();

  // Handle hash navigation
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const link = document.querySelector(`[href="#${hash}"]`);
    if (link) goTo(hash, link);
  }

  // Keyboard shortcut: Escape closes sidebar
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.getElementById('sidebar').classList.remove('open');
    }
  });

  // Close sidebar when clicking outside on mobile
  document.getElementById('mainContent').addEventListener('click', () => {
    if (window.innerWidth < 900) {
      document.getElementById('sidebar').classList.remove('open');
    }
  });
});
