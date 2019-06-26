import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
    beforeModel(/* transition */) {
        this.replaceWith('dashboard'); // Implicitly aborts the on-going transition.
    }
});
