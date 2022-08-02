import { Directive, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { Subject } from "rxjs";
import { takeUntil, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";

@Directive()
export abstract class AbstractDebounceDirective implements OnDestroy {

    private debounceTime: number;
    private metodosCase: string;

    protected emitEvent$: Subject<any>;
    protected subscription$: Subject<void>;

    constructor(public renderer: Renderer2, public elementRef: ElementRef, public debounce: number, public metodos: string) {
        this.metodosCase = metodos;
        this.debounceTime = debounce;
        this.emitEvent$ = new Subject<any>();
        this.subscription$ = new Subject<void>();
    }

    ngOnInit(): void {
        this.emitEvent$
            .pipe(
                takeUntil(this.subscription$),
                debounceTime(this.debounceTime),
                distinctUntilChanged(),
                tap(value => this.emitChange(value))
            )
            .subscribe();
    }

    public emitChange(event: any): void {
        let value = event.target.value;

        if (value) {
            value = value.trim();
            switch (this.metodosCase) {
                case 'M':
                    this.valorEvaluado(value);
                    break;
                case 'N':
                    this.valorEvaluado(value);
                    break;    
                default:
                    this.valorEvaluado(null);
                    break;
            }
        } else {
            this.valorEvaluado(null);
        }
    }

    valorEvaluado(value) {
        this.renderer.setProperty(
            this.elementRef.nativeElement, "value", value);
        this.renderer.setAttribute(
            this.elementRef.nativeElement, "value", value);
    }

    ngOnDestroy(): void {
        this.subscription$.next();
        this.subscription$.complete();
    }
}