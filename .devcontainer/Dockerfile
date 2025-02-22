FROM ubuntu:24.04

# Definir o ambiente para não interativo
ENV DEBIAN_FRONTEND=noninteractive
ENV LANG pt_BR.UTF-8
ENV LANGUAGE pt_BR:pt
ENV LC_ALL pt_BR.UTF-8

# Atualizar e instalar pacotes essenciais
RUN apt-get update && apt-get install -y \
    curl \
    git \
    zsh \
    gnupg \
    sudo \
    software-properties-common \
    postgresql-client \
    locales \
    netcat-openbsd \
    build-essential \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/* \
    && localedef -i pt_BR -c -f UTF-8 -A /usr/share/locale/locale.alias pt_BR.UTF-8

# Instalar NVM
ENV NVM_DIR /root/.nvm
ENV NODE_VERSION lts/*
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# Adicionar nvm, node e npm ao PATH
ENV PATH $NVM_DIR/versions/node/v$(nvm current)/bin:$PATH

# Instalar Node.js (necessário para TypeScript e pnpm)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm

# Instale o oh-my-zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Configure um tema e plugins padrão para o Zsh
RUN git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
    && git clone https://github.com/zsh-users/zsh-history-substring-search ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-history-substring-search


# Copie um arquivo .zshrc personalizado para o container
COPY .devcontainer/default.zshrc /root/.zshrc

# Configure o Zsh como shell padrão
RUN chsh -s $(which zsh)

RUN SNIPPET="\n\nexport PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.zsh_history" \
    && echo "$SNIPPET" >> "/root/.zshrc"

# Adicionar NVM ao .zshrc
RUN echo '\n\nexport NVM_DIR="$HOME/.nvm"' >> /root/.zshrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /root/.zshrc \
    && echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> /root/.zshrc


WORKDIR /app

# Definir o terminal padrão para Zsh
CMD ["zsh"]