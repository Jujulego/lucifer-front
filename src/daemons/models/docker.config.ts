import { BaseConfig } from './config.base';

// Model
export interface DockerConfig extends BaseConfig<'docker'> {
  image: string | null;
  env: Record<string, string>;
}

export interface UpdateDockerConfig {
  image?: string;
  env?: Record<string, string>;
}
