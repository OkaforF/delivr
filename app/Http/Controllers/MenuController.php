<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Restaurant;
use App\MenuItem;
use App\MenuItemType;

class MenuController extends Controller
{
    /**
     * Get menu for each restaurant
     *
     * @return [json] restaurant object
     */
    public function menu(Request $request)
    {
        // get menu for clicked restaurant
        $restaurant = $request->id;

        // get all menu items of restaurant id
        $menu_items = MenuItem::where('restaurant_id', '=', $restaurant)->get();
        
        // create array to store full menu in
        $fullMenu = array();

        // get menu items with type: starter
        $starter_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '1']
        ])->get();

        // get menu items with type: snack
        $snack_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '4']
        ])->get();

        // get menu items with type: main
        $main_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '2']
        ])->get();

        // get menu items with type: food
        $food_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '3']
        ])->get();

        // get menu items with type: dessert
        $dessert_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '5']
        ])->get();

        // get menu items with type: beverage
        $beverage_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '6']
        ])->get();

        // get menu items with type: extra
        $extra_type = MenuItem::where([
            ['restaurant_id', '=', $restaurant],
            ['menu_item_type_id', '=', '7']
        ])->get();

        // set full menu
        $fullMenu[] = ([
            'starter' => ['Starter', $starter_type],
            'snack' => ['Snack', $snack_type],
            'main' => ['Main', $main_type],
            'food' => ['Food', $food_type],
            'dessert' => ['Dessert', $dessert_type],
            'beverage' => ['Beverage', $beverage_type],
            'extra' => ['Extra', $extra_type],
        ]);
        
        return response()->json($fullMenu);
    }
}
