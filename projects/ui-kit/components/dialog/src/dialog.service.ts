import { type ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  InjectionToken,
  Injector,
  PLATFORM_ID,
  TemplateRef,
  type ViewContainerRef,
} from '@angular/core';

import { GaccDialogRef } from './dialog-ref';
import { GaccDialogComponent } from './dialog.component';
import { GaccDialogOptions } from './dialog-options';

type ContentType<T> = ComponentType<T> | TemplateRef<T> | string;

export const GACC_MODAL_DATA = new InjectionToken<any>('GACC_MODAL_DATA');

@Injectable({
  providedIn: 'root',
})
export class GaccDialogService {
  private overlay = inject(Overlay);
  private injector = inject(Injector);
  private platformId = inject(PLATFORM_ID);

  create<T, U>(config: GaccDialogOptions<T, U>): GaccDialogRef<T> {
    return this.open<T, U>(config.gaccContent as ComponentType<T>, config);
  }

  private open<T, U>(componentOrTemplateRef: ContentType<T>, config: GaccDialogOptions<T, U>) {
    const overlayRef = this.createOverlay();

    if (!overlayRef) {
      return new GaccDialogRef(
        undefined as unknown as OverlayRef,
        config,
        undefined as unknown as GaccDialogComponent<T, U>,
        this.platformId,
      );
    }

    const dialogContainer = this.attachDialogContainer<T, U>(overlayRef, config);
    const dialogRef = this.attachDialogContent<T, U>(componentOrTemplateRef, dialogContainer, overlayRef, config);

    dialogContainer.dialogRef = dialogRef;

    return dialogRef;
  }

  private createOverlay(): OverlayRef | undefined {
    if (isPlatformBrowser(this.platformId)) {
      const overlayConfig = new OverlayConfig({
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-dark-backdrop',
        positionStrategy: this.overlay.position().global(),
        scrollStrategy: this.overlay.scrollStrategies.block(),
      });

      return this.overlay.create(overlayConfig);
    }

    return undefined;
  }

  private attachDialogContainer<T, U>(overlayRef: OverlayRef, config: GaccDialogOptions<T, U>) {
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: OverlayRef, useValue: overlayRef },
        { provide: GaccDialogOptions, useValue: config },
      ],
    });

    const containerPortal = new ComponentPortal<GaccDialogComponent<T, U>>(
      GaccDialogComponent,
      config.gaccViewContainerRef,
      injector,
    );

    const containerRef = overlayRef.attach<GaccDialogComponent<T, U>>(containerPortal);

    return containerRef.instance;
  }

  private attachDialogContent<T, U>(
    componentOrTemplateRef: ContentType<T>,
    dialogContainer: GaccDialogComponent<T, U>,
    overlayRef: OverlayRef,
    config: GaccDialogOptions<T, U>,
  ) {
    const dialogRef = new GaccDialogRef<T>(overlayRef, config, dialogContainer, this.platformId);

    if (componentOrTemplateRef instanceof TemplateRef) {
      dialogContainer.attachTemplatePortal(
        new TemplatePortal<T>(
          componentOrTemplateRef,
          null as unknown as ViewContainerRef,
          {
            dialogRef,
          } as T,
        ),
      );
    } else if (typeof componentOrTemplateRef !== 'string') {
      const injector = this.createInjector<T, U>(dialogRef, config);
      const contentRef = dialogContainer.attachComponentPortal<T>(
        new ComponentPortal(componentOrTemplateRef, config.gaccViewContainerRef, injector),
      );
      dialogRef.componentInstance = contentRef.instance;
    }

    return dialogRef;
  }

  private createInjector<T, U>(dialogRef: GaccDialogRef<T>, config: GaccDialogOptions<T, U>) {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: GaccDialogRef, useValue: dialogRef },
        { provide: GACC_MODAL_DATA, useValue: config.gaccData },
      ],
    });
  }
}
