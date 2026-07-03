"""
=============================================================================
HANDS-ON 1 - TASK 1: Web Framework Foundations & Django Concepts
=============================================================================
This file contains detailed annotations covering:
  1. The Request-Response Cycle in Django
  2. Middleware in Django
  3. WSGI vs ASGI
  4. MVC vs MVT (Django's architecture)
=============================================================================
"""

# =============================================================================
# 1. REQUEST-RESPONSE CYCLE IN DJANGO
# =============================================================================
#
# Journey of a GET /api/courses/ request through a Django application:
#
#   Step 1: CLIENT (Browser/Postman) sends HTTP GET request to /api/courses/
#       |
#       v
#   Step 2: WEB SERVER (e.g., Gunicorn / Django dev server) receives the request
#           and passes it to Django via the WSGI/ASGI interface.
#       |
#       v
#   Step 3: MIDDLEWARE (Request Phase)
#           - The request passes through each middleware class in order
#             (as defined in settings.py MIDDLEWARE list).
#           - Each middleware can inspect, modify, or short-circuit the request.
#           - Example: SecurityMiddleware adds security headers,
#             SessionMiddleware attaches session data to the request.
#       |
#       v
#   Step 4: URL ROUTER (URL Dispatcher)
#           - Django's URL resolver matches the request path '/api/courses/'
#             against URL patterns defined in urls.py (ROOT_URLCONF).
#           - It uses pattern matching to find the correct view function
#             or class-based view to handle the request.
#           - If include() is used, it delegates to app-level urls.py.
#       |
#       v
#   Step 5: VIEW (Function-Based or Class-Based)
#           - The matched view function receives the HttpRequest object.
#           - The view contains the business logic:
#               * It may query the database via the Model layer (ORM).
#               * It processes data and prepares the response.
#           - Example: courses_list_view(request) queries Course.objects.all()
#       |
#       v
#   Step 6: MODEL (Database Query via Django ORM)
#           - The view interacts with the database through Django Models.
#           - Django ORM translates Python method calls to SQL queries.
#           - Example: Course.objects.all() -> SELECT * FROM courses_course;
#           - The ORM returns QuerySets (lazy-evaluated collections of objects).
#       |
#       v
#   Step 7: TEMPLATE (Optional - for HTML responses)
#           - For API responses (JSON), templates are often skipped.
#           - For HTML responses, the view passes context data to a template.
#           - The template engine renders the HTML with the provided data.
#       |
#       v
#   Step 8: VIEW returns an HttpResponse (or JsonResponse for APIs)
#           - The view constructs and returns a response object.
#           - Example: JsonResponse({"courses": [...]}, status=200)
#       |
#       v
#   Step 9: MIDDLEWARE (Response Phase)
#           - The response passes back through middleware in REVERSE order.
#           - Each middleware can modify the response before it's sent.
#           - Example: CommonMiddleware may add Content-Length header.
#       |
#       v
#   Step 10: WEB SERVER sends the HTTP response back to the CLIENT.
#


# =============================================================================
# 2. MIDDLEWARE IN DJANGO
# =============================================================================
#
# WHERE MIDDLEWARE SITS:
#   Middleware sits BETWEEN the web server and the view layer. It acts as a
#   series of hooks/plugins that process requests BEFORE they reach the view
#   and process responses AFTER they leave the view.
#
#   Request flow:  Client -> Server -> [Middleware 1 -> 2 -> ... -> N] -> View
#   Response flow: View -> [Middleware N -> ... -> 2 -> 1] -> Server -> Client
#
# TWO BUILT-IN DJANGO MIDDLEWARE CLASSES:
#
# 1. django.middleware.security.SecurityMiddleware
#    - Provides several security enhancements to the request/response cycle.
#    - Sets the HTTP Strict Transport Security (HSTS) header to tell browsers
#      to only use HTTPS connections.
#    - Redirects all non-HTTPS requests to HTTPS (if SECURE_SSL_REDIRECT=True).
#    - Sets the X-Content-Type-Options: nosniff header to prevent the browser
#      from MIME-type sniffing.
#    - Helps protect against protocol downgrade attacks and cookie hijacking.
#
# 2. django.contrib.sessions.middleware.SessionMiddleware
#    - Manages sessions across requests for each user.
#    - Reads the session cookie from the incoming request to identify the user.
#    - Attaches a `session` attribute to the request object (request.session).
#    - After the view processes, it saves modified session data back to the
#      session store (database, cache, or file-based).
#    - Enables stateful behavior on top of the stateless HTTP protocol.
#


# =============================================================================
# 3. WSGI vs ASGI
# =============================================================================
#
# WSGI (Web Server Gateway Interface):
#   - The traditional Python standard for web server <-> web application
#     communication (defined in PEP 3333).
#   - SYNCHRONOUS: Handles one request at a time per worker process/thread.
#   - Each request blocks the worker until the response is ready.
#   - Well-suited for traditional web applications with synchronous I/O
#     (database queries, template rendering, etc.).
#   - Common WSGI servers: Gunicorn, uWSGI, mod_wsgi.
#
# ASGI (Asynchronous Server Gateway Interface):
#   - The modern successor to WSGI, designed for async Python.
#   - ASYNCHRONOUS: Can handle multiple requests concurrently using
#     async/await, without blocking.
#   - Supports WebSockets, HTTP/2, long-polling, and background tasks
#     in addition to regular HTTP requests.
#   - Common ASGI servers: Uvicorn, Daphne, Hypercorn.
#
# DJANGO'S DEFAULT:
#   - Django uses WSGI by default (see coursemanager/wsgi.py).
#   - The default settings include: WSGI_APPLICATION = 'coursemanager.wsgi.application'
#
# WHEN TO SWITCH TO ASGI:
#   - When you need WebSocket support (e.g., real-time chat, live notifications).
#   - When you need to handle long-lived connections (streaming responses).
#   - When you want to use Django's async views (async def view) for I/O-bound
#     operations to improve concurrency.
#   - When integrating with Django Channels for real-time features.
#   - When your application needs to handle many simultaneous connections
#     efficiently (e.g., high-concurrency APIs).
#


# =============================================================================
# 4. MVC PATTERN vs DJANGO'S MVT PATTERN
# =============================================================================
#
# MVC (Model-View-Controller) - Traditional Pattern:
#   - Model:      Manages data, business logic, and database interactions.
#   - View:       Handles the presentation layer (what the user sees - UI/HTML).
#   - Controller: Receives user input, processes it (calls Model), and selects
#                 the appropriate View to render the response.
#
# MVT (Model-View-Template) - Django's Pattern:
#   - Model:    Same as MVC Model. Defines data structure and handles DB
#               interaction via the Django ORM. Maps to database tables.
#               (Model == Model in MVC)
#
#   - View:     Acts as the CONTROLLER in MVC. It receives the HTTP request,
#               contains business logic, queries the Model, and returns an
#               HTTP response. The View decides WHAT data to show and WHICH
#               template to use.
#               (View in Django == Controller in MVC)
#
#   - Template: Acts as the VIEW in MVC. It is responsible for the presentation
#               layer — rendering HTML with data passed from the View.
#               Templates use Django Template Language (DTL) for dynamic content.
#               (Template in Django == View in MVC)
#
# MAPPING TABLE:
#   +------------------+------------------+
#   |   MVC Pattern    |  Django's MVT    |
#   +------------------+------------------+
#   |   Model          |   Model          |
#   |   View (UI)      |   Template       |
#   |   Controller     |   View           |
#   +------------------+------------------+
#
# KEY INSIGHT:
#   Django's "View" is confusingly named — it does NOT correspond to the
#   "View" in MVC. Django's View is the Controller, and Django's Template
#   is the View. The framework itself acts as the controller dispatcher
#   (URL routing), so the developer focuses on writing Views (business logic)
#   and Templates (presentation).
#


# =============================================================================
# END OF NOTES
# =============================================================================

if __name__ == "__main__":
    print("=" * 70)
    print("  HANDS-ON 1 - TASK 1: Web Framework Foundations & Django Concepts")
    print("=" * 70)
    print()
    print("This file contains detailed annotations covering:")
    print("  1. The Request-Response Cycle in Django")
    print("  2. Middleware in Django (SecurityMiddleware & SessionMiddleware)")
    print("  3. WSGI vs ASGI (differences and when to switch)")
    print("  4. MVC vs MVT (Django's architecture mapping)")
    print()
    print("Open this file in an editor to read the full notes.")
    print("=" * 70)
