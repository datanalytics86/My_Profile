# Dockerfile Template - Multi-stage build

# ===================================
# Stage 1: Base
# ===================================
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies for native modules
RUN apk add --no-cache libc6-compat

# ===================================
# Stage 2: Dependencies
# ===================================
FROM base AS deps

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# ===================================
# Stage 3: Builder
# ===================================
FROM base AS builder

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# ===================================
# Stage 4: Runner (Production)
# ===================================
FROM base AS runner

# Set NODE_ENV
ENV NODE_ENV production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

# Copy dependencies from deps stage
COPY --from=deps --chown=appuser:nodejs /app/node_modules ./node_modules

# Copy built application from builder
COPY --from=builder --chown=appuser:nodejs /app/dist ./dist
COPY --from=builder --chown=appuser:nodejs /app/package.json ./

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "dist/index.js"]


# ===================================
# Python Dockerfile Alternative
# ===================================

# FROM python:3.11-slim AS base
#
# # Set environment variables
# ENV PYTHONUNBUFFERED=1 \
#     PYTHONDONTWRITEBYTECODE=1 \
#     PIP_NO_CACHE_DIR=1 \
#     PIP_DISABLE_PIP_VERSION_CHECK=1
#
# WORKDIR /app
#
# # ===================================
# # Stage 2: Builder
# # ===================================
# FROM base AS builder
#
# # Install build dependencies
# RUN apt-get update && \
#     apt-get install -y --no-install-recommends \
#     build-essential \
#     && rm -rf /var/lib/apt/lists/*
#
# # Create virtual environment
# RUN python -m venv /opt/venv
# ENV PATH="/opt/venv/bin:$PATH"
#
# # Copy requirements
# COPY requirements.txt .
#
# # Install Python dependencies
# RUN pip install --no-cache-dir -r requirements.txt
#
# # ===================================
# # Stage 3: Runner
# # ===================================
# FROM base AS runner
#
# # Copy virtual environment from builder
# COPY --from=builder /opt/venv /opt/venv
# ENV PATH="/opt/venv/bin:$PATH"
#
# # Create non-root user
# RUN useradd -m -u 1001 appuser
#
# # Copy application
# COPY --chown=appuser:appuser . .
#
# # Switch to non-root user
# USER appuser
#
# # Expose port
# EXPOSE 8000
#
# # Health check
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#     CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"
#
# # Start application
# CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
