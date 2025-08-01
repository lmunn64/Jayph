import { defineComponent, withAsyncContext, unref, ref, watch, computed, mergeProps, isRef, resolveComponent, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { u as usePropertyStore, _ as __nuxt_component_3, V as VueCalendar, a as __nuxt_component_0$1$1 } from './properties-CIZhV5Ne.mjs';
import { _ as __nuxt_component_0$3 } from './nuxt-link-BDsI5v4k.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/vue-fontawesome';
import '@fortawesome/free-solid-svg-icons';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@vuepic/vue-datepicker';
import './asyncData-B_vdoQGz.mjs';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Hero",
  __ssrInlineRender: true,
  setup(__props) {
    const images = [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
      // mountain lake
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
      // beach
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80"
      // night mountain
    ];
    const currentIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hero" }, _attrs))} data-v-ae0ee551><div class="slideshow" data-v-ae0ee551><!--[-->`);
      ssrRenderList(images, (img, index2) => {
        _push(`<img${ssrRenderAttr("src", img)} class="${ssrRenderClass([{ active: index2 === unref(currentIndex) }, "hero-image"])}" alt="Hero Slide" data-v-ae0ee551>`);
      });
      _push(`<!--]--></div><div class="gradient-overlay" data-v-ae0ee551></div><div class="hero-overlay" data-v-ae0ee551><h1 class="hero-title" data-v-ae0ee551>Welcome to Fountain City Stays!</h1><p class="hero-subtitle" data-v-ae0ee551>Our spaces are designed with you in mind. We wish to provide an atmosphere that makes you smile. </p></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Hero.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-ae0ee551"]]);
const _sfc_main$4 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Hero = __nuxt_component_0$2;
  _push(ssrRenderComponent(_component_Hero, _attrs, null, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroContainer.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ListingSearch",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedDates = ref();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    const search = ref({
      location: "",
      checkinDate: "",
      checkoutDate: "",
      adults: 2,
      children: 0,
      infants: 0,
      pets: 0
    });
    const guestCounts = ref({
      adults: 2,
      children: 0,
      infants: 0,
      pets: 0
    });
    watch([guestCounts, selectedDates], ([newGuests, newDates]) => {
      search.value.adults = newGuests.adults;
      search.value.children = newGuests.children;
      search.value.infants = newGuests.infants;
      search.value.pets = newGuests.pets;
      console.log(newDates);
      if (newDates !== void 0) {
        search.value.checkinDate = newDates[0];
        search.value.checkoutDate = newDates[1];
      } else {
        search.value.checkinDate = "";
        search.value.checkoutDate = "";
      }
      console.log(search.value);
    });
    const guestSummary = computed(() => {
      const parts = [];
      if (guestCounts.value.adults > 0) parts.push(`${guestCounts.value.adults} Adult${guestCounts.value.adults > 1 ? "s" : ""}`);
      if (guestCounts.value.children > 0) parts.push(`${guestCounts.value.children} Child${guestCounts.value.children > 1 ? "ren" : ""}`);
      if (guestCounts.value.infants > 0) parts.push(`${guestCounts.value.infants} Infant${guestCounts.value.infants > 1 ? "s" : ""}`);
      if (guestCounts.value.pets > 0) parts.push(`${guestCounts.value.pets} Pet${guestCounts.value.pets > 1 ? "s" : ""}`);
      return parts.length > 0 ? parts.join(", ") : "Guests";
    });
    const showDropdowns = ref([false, false, false]);
    const dropdownAbove = ref([false, false, false]);
    const formattedDate = (date) => {
      const toFormat = new Date(date);
      return toFormat.toLocaleDateString(void 0, options);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "listing-container" }, _attrs))} data-v-bb4b9268><h1 class="title" data-v-bb4b9268>Find your stay.</h1><div class="btn-container" data-v-bb4b9268><div class="dropdown" data-v-bb4b9268><button class="input" data-v-bb4b9268>${ssrInterpolate(unref(search).location ? unref(search).location : "Location")}</button>`);
      if (unref(showDropdowns)[0]) {
        _push(`<div class="${ssrRenderClass({ menu: true, above: unref(dropdownAbove)[0] })}" data-v-bb4b9268><button data-v-bb4b9268>Branson West</button><button data-v-bb4b9268>Kansas City</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="dropdown" data-v-bb4b9268><button class="input" data-v-bb4b9268>${ssrInterpolate(unref(search).checkinDate && unref(search).checkoutDate ? `${formattedDate(unref(search).checkinDate)} \u2192 ${formattedDate(unref(search).checkoutDate)}` : "Check-in \u2192 Check-out")}</button>`);
      if (unref(showDropdowns)[1]) {
        _push(`<div class="${ssrRenderClass(["menu", "date-menu", { above: unref(dropdownAbove)[1] }])}" data-v-bb4b9268>`);
        _push(ssrRenderComponent(VueCalendar, {
          modelValue: unref(selectedDates),
          "onUpdate:modelValue": ($event) => isRef(selectedDates) ? selectedDates.value = $event : null,
          "for-search": true
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="dropdown" data-v-bb4b9268><button class="input" data-v-bb4b9268>${ssrInterpolate(unref(guestSummary))}</button>`);
      if (unref(showDropdowns)[2]) {
        _push(`<div class="${ssrRenderClass({ menu: true, above: unref(dropdownAbove)[2] })}" data-v-bb4b9268>`);
        _push(ssrRenderComponent(__nuxt_component_0$1$1, {
          modelValue: unref(guestCounts),
          "onUpdate:modelValue": ($event) => isRef(guestCounts) ? guestCounts.value = $event : null
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="search" data-v-bb4b9268> Search </button></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ListingSearch.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-bb4b9268"]]);
const thumbnail = "https://media.tenor.com/P4HGr5rklqYAAAAM/spongebob.gif";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PropCard",
  __ssrInlineRender: true,
  props: {
    id: {},
    title: {},
    img_src: {},
    description: {},
    city: {},
    state: {},
    guests: {},
    bedrooms: {},
    bathrooms: {}
  },
  setup(__props) {
    const props = __props;
    function setDefaultImage(event) {
      event.target.src = thumbnail;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$3;
      const _component_font_awesome_icon = resolveComponent("font-awesome-icon");
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/properties/${props.id}`,
        class: "card-link",
        draggable: "false"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="card" data-v-e550ff9d${_scopeId}><div class="thumbnail-wrapper" data-v-e550ff9d${_scopeId}><img${ssrRenderAttr("src", props.img_src)} alt="thumbnail" class="thumbnail" draggable="false" data-v-e550ff9d${_scopeId}></div><div class="content" data-v-e550ff9d${_scopeId}><h3 data-v-e550ff9d${_scopeId}>${ssrInterpolate(props.title)}</h3><p data-v-e550ff9d${_scopeId}>${ssrInterpolate(props.city)}, ${ssrInterpolate(props.state)}</p></div><div class="amenities" data-v-e550ff9d${_scopeId}><p data-v-e550ff9d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_font_awesome_icon, { icon: "user" }, null, _parent2, _scopeId));
            _push2(` Guests ${ssrInterpolate(props.guests)}</p><p data-v-e550ff9d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_font_awesome_icon, { icon: "bed" }, null, _parent2, _scopeId));
            _push2(` Bedrooms ${ssrInterpolate(props.bedrooms)}</p><p data-v-e550ff9d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_font_awesome_icon, { icon: "bath" }, null, _parent2, _scopeId));
            _push2(` Bathrooms ${ssrInterpolate(props.bathrooms)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "card" }, [
                createVNode("div", { class: "thumbnail-wrapper" }, [
                  createVNode("img", {
                    src: props.img_src,
                    alt: "thumbnail",
                    class: "thumbnail",
                    draggable: "false",
                    onError: setDefaultImage
                  }, null, 40, ["src"])
                ]),
                createVNode("div", { class: "content" }, [
                  createVNode("h3", null, toDisplayString(props.title), 1),
                  createVNode("p", null, toDisplayString(props.city) + ", " + toDisplayString(props.state), 1)
                ]),
                createVNode("div", { class: "amenities" }, [
                  createVNode("p", null, [
                    createVNode(_component_font_awesome_icon, { icon: "user" }),
                    createTextVNode(" Guests " + toDisplayString(props.guests), 1)
                  ]),
                  createVNode("p", null, [
                    createVNode(_component_font_awesome_icon, { icon: "bed" }),
                    createTextVNode(" Bedrooms " + toDisplayString(props.bedrooms), 1)
                  ]),
                  createVNode("p", null, [
                    createVNode(_component_font_awesome_icon, { icon: "bath" }),
                    createTextVNode(" Bathrooms " + toDisplayString(props.bathrooms), 1)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PropCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-e550ff9d"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PropContainer",
  __ssrInlineRender: true,
  props: {
    properties: {}
  },
  setup(__props) {
    const props = __props;
    const selectedLocation = ref("Kansas City");
    const filteredProperties = computed(() => {
      return props.properties.filter((p) => p.address.city === selectedLocation.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PropCard = __nuxt_component_0;
      _push(`<!--[--><h1 data-v-493b17ff>Our Properties</h1><div class="filter-buttons" data-v-493b17ff><button class="${ssrRenderClass({ active: unref(selectedLocation) === "Kansas City" })}" data-v-493b17ff>Kansas City</button><button class="${ssrRenderClass({ active: unref(selectedLocation) === "Branson West" })}" data-v-493b17ff>Branson West</button></div><div class="card-grid" data-v-493b17ff><!--[-->`);
      ssrRenderList(unref(filteredProperties), (property, index2) => {
        _push(ssrRenderComponent(_component_PropCard, {
          id: property.id,
          title: property.name,
          img_src: property.picture_url,
          description: property.description,
          city: property.address.city,
          state: property.address.state,
          guests: property.capacity.max,
          bedrooms: property.capacity.bedrooms,
          bathrooms: property.capacity.bathrooms
        }, null, _parent));
      });
      _push(`<!--]--></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PropContainer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-493b17ff"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const propertyStore = usePropertyStore();
    [__temp, __restore] = withAsyncContext(() => propertyStore.fetchProperties()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeroContainer = __nuxt_component_0$1;
      const _component_ListingSearch = __nuxt_component_1;
      const _component_PropContainer = __nuxt_component_2;
      const _component_ReviewCarousel = __nuxt_component_3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_HeroContainer, null, null, _parent));
      _push(ssrRenderComponent(_component_ListingSearch, null, null, _parent));
      _push(`<div class="wrapper" data-v-00eb6ec6>`);
      if (unref(propertyStore).isLoaded) {
        _push(`<div data-v-00eb6ec6>`);
        _push(ssrRenderComponent(_component_PropContainer, {
          properties: unref(propertyStore).properties
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 data-v-00eb6ec6> Why Guests Choose Us...</h1>`);
      _push(ssrRenderComponent(_component_ReviewCarousel, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-00eb6ec6"]]);

export { index as default };
//# sourceMappingURL=index-Zt1n9SFm.mjs.map
