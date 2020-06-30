import { DockerConfig } from './docker.config';

// Alias
export type DaemonConfig = DockerConfig;

export type DaemonConfigType = DockerConfig['type'];

// Types
export interface CreateConfig {
  type: DaemonConfigType
}
