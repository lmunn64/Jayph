import { defineComponent, withAsyncContext, computed, unref, ref, mergeProps, useTemplateRef, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc, a as useRoute } from './server.mjs';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircle, faSnowflake, faUtensils, faGamepad, faPuzzlePiece, faBroom, faBook, faFan, faCoffee, faTshirt, faTable, faBoxOpen, faFireAlt, faFireExtinguisher, faFirstAid, faCar, faDumbbell, faBlender, faLaptop, faHotTub, faChair, faSwimmer, faTv, faWineGlass, faWifi, faChild, faPaw, faKey, faLightbulb, faSoap, faDoorClosed, faBolt, faCouch, faBathtub, faToiletPaper, faBed, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { u as usePropertyStore, _ as __nuxt_component_3, V as VueCalendar, a as __nuxt_component_0$1 } from './properties-CIZhV5Ne.mjs';
import { u as useAsyncData } from './asyncData-B_vdoQGz.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import '@vuepic/vue-datepicker';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "PropHero",
  __ssrInlineRender: true,
  props: {
    images: {}
  },
  setup(__props) {
    const currentIndex = ref(0);
    const showGallery = ref(false);
    const showSlideshow = ref(false);
    const slideshowIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hero" }, _attrs))} data-v-09703231><div class="slideshow" data-v-09703231><!--[-->`);
      ssrRenderList(_ctx.images, (img, index) => {
        _push(`<img${ssrRenderAttr("src", img)} class="${ssrRenderClass([{ active: index === unref(currentIndex) }, "hero-image"])}" alt="Hero Slide" data-v-09703231>`);
      });
      _push(`<!--]--></div><button class="see-photos-btn" data-v-09703231>See all photos</button>`);
      if (unref(showGallery)) {
        _push(`<div class="modal" data-v-09703231><div class="gallery-grid" data-v-09703231><!--[-->`);
        ssrRenderList(_ctx.images, (img, index) => {
          _push(`<img${ssrRenderAttr("src", img)} class="gallery-thumb" data-v-09703231>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showSlideshow)) {
        _push(`<div class="modal slideshow-modal" data-v-09703231><img${ssrRenderAttr("src", _ctx.images[unref(slideshowIndex)])} class="slideshow-image" data-v-09703231><button class="nav left" data-v-09703231>\u2039</button><button class="nav right" data-v-09703231>\u203A</button><button class="close" data-v-09703231>\xD7</button><div class="thumbnail-strip" data-v-09703231><!--[-->`);
        ssrRenderList(_ctx.images, (img, index) => {
          _push(`<img${ssrRenderAttr("src", img)} class="${ssrRenderClass([{ active: index === unref(slideshowIndex) }, "thumbnail-preview"])}" data-v-09703231>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PropHero.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-09703231"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Amenities",
  __ssrInlineRender: true,
  props: {
    amenities: {}
  },
  setup(__props) {
    const props = __props;
    const iconMap = {};
    function useIcon(icon, keys) {
      keys.forEach((key) => {
        iconMap[key] = icon;
      });
    }
    useIcon(faSnowflake, ["ac", "refrigerator", "mini_fridge", "freezer"]);
    useIcon(faUtensils, [
      "alfresco_dining",
      "barbeque_utensils",
      "cooking_basics",
      "dishes_and_silverware",
      "oven",
      "kitchen",
      "full_kitchen",
      "formal_dining_area"
    ]);
    useIcon(faGamepad, ["arcade_machine", "game_console"]);
    useIcon(faPuzzlePiece, ["board_games", "life_size_games", "theme_room"]);
    useIcon(faBroom, ["baking_sheet", "cleaning_products", "hair_dryer"]);
    useIcon(faBook, ["books"]);
    useIcon(faFan, ["ceiling_fan", "portable_fans"]);
    useIcon(faCoffee, ["coffee", "coffee_maker"]);
    useIcon(faTshirt, ["hangers", "washer", "wardrobe_or_closet", "iron", "laundromat_nearby"]);
    useIcon(faTable, ["dining_table"]);
    useIcon(faBoxOpen, [
      "dishwasher",
      "dryer",
      "essentials",
      "microwave",
      "stair_gates",
      "toaster"
    ]);
    useIcon(faFireAlt, ["bbq_area", "fireplace", "heating", "fire_pit"]);
    useIcon(faFireExtinguisher, ["fire_extinguisher"]);
    useIcon(faFirstAid, ["first_aid_kit"]);
    useIcon(faCar, ["free_parking", "outdoor_parking", "street_parking"]);
    useIcon(faDumbbell, ["gym"]);
    useIcon(faBlender, ["blender"]);
    useIcon(faLaptop, ["laptop_friendly_workspace"]);
    useIcon(faHotTub, ["bathtub", "hot_water"]);
    useIcon(faChair, ["high_chair", "outdoor_seating"]);
    useIcon(faSwimmer, ["pool"]);
    useIcon(faTv, ["tv", "smart_tv"]);
    useIcon(faWineGlass, ["wine_glasses"]);
    useIcon(faWifi, ["wireless_internet", "internet"]);
    useIcon(faChild, ["crib", "pack_n_play_travel_crib"]);
    useIcon(faPaw, ["playground"]);
    useIcon(faKey, ["twenty_four_hour_checkin"]);
    useIcon(faLightbulb, [
      "garden_or_backyard",
      "patio",
      "patio_or_balcony",
      "room_darkening_shades"
    ]);
    useIcon(faSoap, ["conditioner", "body_soap", "shampoo", "shower_gel"]);
    useIcon(faDoorClosed, ["long_term_stays_allowed", "private_entrance"]);
    useIcon(faBolt, ["carbon_monoxide_detector"]);
    useIcon(faCouch, ["private_living_room"]);
    useIcon(faBathtub, ["bathroom_essentials", "bath_towel", "walk_in_shower"]);
    useIcon(faToiletPaper, ["toilet_paper"]);
    useIcon(faBed, ["bed_linens", "bedroom_comforts", "extra_pillows_and_blankets"]);
    useIcon(faExclamationTriangle, ["smoke_detector"]);
    const defaultIcon = faCircle;
    function getIcon(amenity) {
      return iconMap[amenity] || defaultIcon;
    }
    function formatAmenity(text) {
      const customMap = {
        ac: "AC",
        bbq_area: "BBQ Area",
        wifi: "Wi-Fi",
        tv: "TV",
        smart_tv: "Smart TV",
        twenty_four_hour_checkin: "Twenty-Four Hour Check-In",
        walk_in_shower: "Walk-In Shower"
      };
      if (customMap[text]) return customMap[text];
      return text.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }
    const expanded = ref(false);
    const visibleAmenities = computed(() => {
      return expanded.value ? props.amenities : props.amenities.slice(0, 16);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><ul class="amenities-grid" data-v-d3a219d4><!--[-->`);
      ssrRenderList(unref(visibleAmenities), (item) => {
        _push(`<li class="amenity-item" data-v-d3a219d4>`);
        _push(ssrRenderComponent(unref(FontAwesomeIcon), {
          icon: getIcon(item),
          class: "icon"
        }, null, _parent));
        _push(`<span class="amenity-text" data-v-d3a219d4>${ssrInterpolate(formatAmenity(item))}</span></li>`);
      });
      _push(`<!--]--></ul>`);
      if (props.amenities.length > 16) {
        _push(`<button class="toggle-btn" data-v-d3a219d4>${ssrInterpolate(unref(expanded) ? "Show less" : "Show all amenities")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Amenities.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d3a219d4"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PropBooking",
  __ssrInlineRender: true,
  props: {
    id: {}
  },
  async setup(__props) {
    let __temp, __restore;
    const bookingProps = __props;
    const selectedDates = ref();
    const hasPromo = ref(false);
    const guestCounts = ref({
      adults: 2,
      children: 0,
      infants: 0,
      pets: 0
    });
    const promoCode = ref();
    useTemplateRef("promo-form");
    const current_quote = ref();
    const is_fetching_quote = ref(false);
    const { data: calendar_data, error } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `calendar-${bookingProps.id}`,
      () => $fetch(`https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/${bookingProps.id}/calendar`)
    )), __temp = await __temp, __restore(), __temp);
    let calendar = calendar_data.value;
    let debounceTimer = null;
    watch([selectedDates, guestCounts, promoCode], async ([newDates, newGuests, newPromo]) => {
      if (!newDates || !newDates[0] || !newDates[1]) {
        current_quote.value = void 0;
        is_fetching_quote.value = false;
        if (debounceTimer) clearTimeout(debounceTimer);
        return;
      }
      if (newDates != void 0) {
        is_fetching_quote.value = true;
        if (debounceTimer)
          clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
          var _a, _b, _c, _d;
          const quotePayload = {
            checkin_date: (_b = (_a = selectedDates.value) == null ? void 0 : _a[0]) != null ? _b : "",
            checkout_date: (_d = (_c = selectedDates.value) == null ? void 0 : _c[1]) != null ? _d : "",
            guests: {
              adults: guestCounts.value.adults,
              children: guestCounts.value.children,
              infants: guestCounts.value.infants,
              pets: guestCounts.value.pets
            },
            promo_code: promoCode.value
          };
          if (newPromo != void 0)
            quotePayload.promo_code = newPromo;
          console.log("quote being generated...: ", quotePayload);
          try {
            const quote_response = await $fetch(
              `https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/${bookingProps.id}/quote`,
              {
                method: "POST",
                body: quotePayload
              }
            );
            if (quote_response) {
              current_quote.value = quote_response;
              console.log("Quote received: ", current_quote.value);
              is_fetching_quote.value = false;
            }
          } catch (error2) {
            console.error("Error fetching quote:", error2);
            is_fetching_quote.value = false;
          }
        }, 700);
      }
    }, { deep: true });
    const clearQuoteResponse = () => {
      console.log("clearing quote response");
      current_quote.value = void 0;
      is_fetching_quote.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_GuestSelector = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "booking-wrapper" }, _attrs))} data-v-3a39cb79><div class="booking-component" data-v-3a39cb79>`);
      if (!unref(calendar)) {
        _push(`<h2 data-v-3a39cb79> Sorry, we cannot display the booking details at this time, try refreshing the page.</h2>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(calendar)) {
        _push(`<div class="calendar-col" data-v-3a39cb79>`);
        _push(ssrRenderComponent(VueCalendar, {
          onDeleteQuoteResponse: clearQuoteResponse,
          modelValue: selectedDates.value,
          "onUpdate:modelValue": ($event) => selectedDates.value = $event,
          cal_data: unref(calendar)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(calendar)) {
        _push(`<div class="booking-info" data-v-3a39cb79><h1 data-v-3a39cb79>Your Stay</h1><div class="placeholder-guest-selector" data-v-3a39cb79>`);
        if (unref(calendar)) {
          _push(ssrRenderComponent(_component_GuestSelector, {
            modelValue: guestCounts.value,
            "onUpdate:modelValue": ($event) => guestCounts.value = $event
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!is_fetching_quote.value && current_quote.value) {
          _push(`<div class="price-info" data-v-3a39cb79><h2 data-v-3a39cb79>Price Details</h2><table class="price-table" data-v-3a39cb79><tbody class="price-table-body" data-v-3a39cb79><tr data-v-3a39cb79><td class="td-start" data-v-3a39cb79>Sub Total</td><td class="td-end" data-v-3a39cb79>${ssrInterpolate(current_quote.value.sub_total)}</td></tr><!--[-->`);
          ssrRenderList(current_quote.value.fees.filter((e) => e.amount > 0), (fee, i) => {
            _push(`<tr data-v-3a39cb79><td class="td-start" data-v-3a39cb79>${ssrInterpolate(fee.label)}</td><td class="td-end" data-v-3a39cb79>${ssrInterpolate(fee.formatted)}</td></tr>`);
          });
          _push(`<!--]--><!--[-->`);
          ssrRenderList(current_quote.value.discounts, (discount, i) => {
            _push(`<tr data-v-3a39cb79><td class="td-start" data-v-3a39cb79>${ssrInterpolate(discount.label)}</td><td class="td-end" data-v-3a39cb79>${ssrInterpolate(discount.formatted)}</td></tr>`);
          });
          _push(`<!--]--></tbody></table><table class="total-table" data-v-3a39cb79><tbody class="price-table-body" data-v-3a39cb79><tr data-v-3a39cb79><td class="td-total-start" data-v-3a39cb79>Total Before Taxes</td><td class="td-total-end" data-v-3a39cb79>${ssrInterpolate(current_quote.value.total_before_tax)}</td></tr></tbody></table><div class="promo-container" data-v-3a39cb79>`);
          if (current_quote.value) {
            _push(`<p class="${ssrRenderClass([{ hidden: hasPromo.value }, "promo-code-text"])}" data-v-3a39cb79>I have a discount code</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="${ssrRenderClass([{ hidden: !hasPromo.value }, "promo-container"])}" data-v-3a39cb79><input type="text" class="promo-code-form" data-v-3a39cb79><button class="promo-code-btn" data-v-3a39cb79>Submit</button></div></div><div class="request-book-container" data-v-3a39cb79><button class="rq-book-btn" data-v-3a39cb79>Request to Book</button><p class="small-text" data-v-3a39cb79>You won&#39;t be charged yet</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (is_fetching_quote.value) {
          _push(`<div class="loader" data-v-3a39cb79></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PropBooking.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-3a39cb79"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "location-wrapper" }, _attrs))} data-v-18a1a879><h1 style="${ssrRenderStyle({ "text-align": "center" })}" data-v-18a1a879> &quot;Find Us&quot; Placeholder </h1></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PropLocation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-18a1a879"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const id = route.params.id;
    const propertyStore = usePropertyStore();
    const { data: properties } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("properties", async () => {
      await propertyStore.fetchProperties();
      return propertyStore.properties;
    })), __temp = await __temp, __restore(), __temp);
    const { data: images } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`images-${id}`, async () => {
      await propertyStore.fetchImages(id);
      return propertyStore.property_images[id];
    })), __temp = await __temp, __restore(), __temp);
    const property = computed(
      () => {
        if (properties.value) {
          return properties.value.find((p) => p.id.toString() === id);
        }
        return void 0;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PropHero = __nuxt_component_0;
      const _component_Amenities = __nuxt_component_1;
      const _component_PropBooking = __nuxt_component_2;
      const _component_ReviewCarousel = __nuxt_component_3;
      const _component_PropLocation = __nuxt_component_4;
      if (unref(property)) {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-772480d3>`);
        if (unref(images)) {
          _push(ssrRenderComponent(_component_PropHero, { images: unref(images) }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="wrapper" data-v-772480d3><h1 data-v-772480d3>${ssrInterpolate(unref(property).name)}</h1><p data-v-772480d3>${ssrInterpolate(unref(property).summary)}</p><h2 data-v-772480d3> Amenities </h2>`);
        _push(ssrRenderComponent(_component_Amenities, {
          amenities: unref(property).amenities
        }, null, _parent));
        _push(`<h2 data-v-772480d3> Space Overview </h2><p data-v-772480d3>${ssrInterpolate(unref(property).details.space_overview)}</p>`);
        if (unref(property).details.neighborhood_description) {
          _push(`<div data-v-772480d3><h3 data-v-772480d3> About the Neighborhood</h3><p data-v-772480d3>${ssrInterpolate(unref(property).details.neighborhood_description)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h3 data-v-772480d3> Guest Access </h3><p data-v-772480d3>${ssrInterpolate(unref(property).details.guest_access)}</p><h3 data-v-772480d3> Other Details </h3><p data-v-772480d3>${ssrInterpolate(unref(property).details.other_details)}</p>`);
        _push(ssrRenderComponent(_component_PropBooking, { id: unref(id) }, null, _parent));
        _push(`<h1 style="${ssrRenderStyle({ "text-align": "center" })}" data-v-772480d3>Reviews</h1>`);
        _push(ssrRenderComponent(_component_ReviewCarousel, { propertyId: unref(id) }, null, _parent));
        _push(ssrRenderComponent(_component_PropLocation, null, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)} data-v-772480d3><p data-v-772480d3> Loading property... </p></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/properties/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-772480d3"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-DYhd4cTv.mjs.map
