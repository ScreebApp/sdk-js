import { Inject, ModuleWithProviders, NgModule } from "@angular/core";
import { Screeb } from "./screeb";
import { ScreebConfig } from "./screeb-config";

@NgModule({
  providers: [Screeb, ScreebConfig],
})
export class ScreebModule {
  /**
   * This is used to initialize Screeb at the top of your Angular application
   * @param config Configuration to pass to Screeb browser SDK
   *
   * @example
   * ```ts
   * ScreebModule.forRoot({
   *   autoInit: true,
   *   "<your-website-id>",
   *   "<your-user-id>",
   *   {
   *     firstname: '<user-firstname>',
   *     lastname: '<user-lastname>',
   *     plan: '<user-plan>',
   *     last_seen_at: new Date(),
   *     authenticated: true
   *   }
   * })
   * ```
   */
  static forRoot(config: ScreebConfig): ModuleWithProviders<ScreebModule> {
    return {
      ngModule: ScreebModule,
      providers: [Screeb, { provide: ScreebConfig, useValue: config }],
    };
  }

  constructor(
    @Inject(ScreebConfig) config: ScreebConfig,
    @Inject(Screeb) screeb: Screeb
  ) {
    if (config.shouldLoad ?? true) {
      screeb.load();
    }

    if ((config.autoInit ?? false) && config.websiteId) {
      screeb.init(config.websiteId, config.userId, config.userProperties);
    }
  }
}
