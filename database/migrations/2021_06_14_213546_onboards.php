<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Onboards extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('onboards', function (Blueprint $table) {
            $table->increments('id');
            $table->string('store_hash')->unique();
            $table->text('status');
            $table->integer('storefrontChannelId');
            $table->integer('managedChannelId');
            $table->text('platformAccessToken');
            $table->text('platformBusinessId');
            $table->text('platformAccountId');
            $table->text('platformAnalyticsId');
            $table->text('platformUserProfile');
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('onboards');
    }
}
